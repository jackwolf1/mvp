package com.architecture.common.base

import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.widget.Button
import android.widget.FrameLayout
import butterknife.BindView
import com.architecture.common.R
import com.architecture.common.ui.recyclerview.LoadMoreFooterView
import com.aspsine.swipetoloadlayout.OnLoadMoreListener
import com.aspsine.swipetoloadlayout.OnRefreshListener
import com.aspsine.swipetoloadlayout.SwipeToLoadLayout
import com.jakewharton.rxbinding2.view.RxView


/**
 * 有presenter的列表界面
 * T 数据
 * U RecyclerView.ViewHolder
 * V View
 * P presenter
 * Created by Administrator on 2018/2/11 0011.
 */
abstract class BaseListPresenterFragment<M, VH : RecyclerView.ViewHolder, V : LceView<M>, P : LcePresenter<V>> : BasePresenterFragment<V, P>(),
        OnRefreshListener, OnLoadMoreListener {


    //上拉下拉
    lateinit var mSwipeToLoadLayout: SwipeToLoadLayout

    lateinit var mLoadMoreFooterView: LoadMoreFooterView

    //列表
    lateinit var mRecyclerView: RecyclerView

    //对应界面
    lateinit var mLayoutNull: FrameLayout


    lateinit var mAdapter: BaseAdapter<M, VH>


    var isRefresh = true//是否是刷新

    public override fun initView() {
        findViewById()
        //查找是否有默认列表控件
        mRecyclerView = mView.findViewById<View>(R.id.swipe_target) as RecyclerView

        mLayoutNull.isFocusableInTouchMode = true
        mLayoutNull.isFocusable = true
        mLayoutNull.setOnTouchListener { v, event -> true }
        if (mSwipeToLoadLayout != null) {
            mSwipeToLoadLayout.setOnRefreshListener(this)
            mSwipeToLoadLayout.setOnLoadMoreListener(this)
        }
        //设置配置器
        setAdapter()
        //设置单列的RecyclerView，默认设置，可以自由修改
        setRecyclerView()
        //显示正在加载
        showWaiting()


    }

    fun findViewById(){
        mSwipeToLoadLayout = mView.findViewById(R.id.swipeToLoadLayout)
        mLoadMoreFooterView =mView.findViewById(R.id.swipe_load_more_footer)
        mLayoutNull = mView.findViewById(R.id.layoutNull)
    }

    /**
     * 设置配置器
     */
    protected abstract fun setAdapter()

    /**
     * 设置RecyclerView单列的列表
     */
    protected fun setRecyclerView() {
        if (mRecyclerView != null && mAdapter != null) {
            mRecyclerView.setHasFixedSize(true)
            //设置layoutManager
            mRecyclerView.layoutManager = LinearLayoutManager(mActivity)
            mRecyclerView.adapter = mAdapter
        }
    }

    override fun onLoadMore() {
        isRefresh = false
        (getPresenter() as P).getMoreList()
    }

    override fun onRefresh() {
        isRefresh = true
        (getPresenter() as P).getRefreshList()
    }



    fun showWaiting() {
        val view = LayoutInflater.from(mActivity).inflate(R.layout.null_wait, null)
        mLayoutNull.removeAllViews()
        mLayoutNull.addView(view)
    }

    fun showNullNetwork() {
        mLayoutNull.visibility = View.VISIBLE
        val view = LayoutInflater.from(mActivity).inflate(R.layout.null_network, null)
        mLayoutNull.removeAllViews()
        mLayoutNull.addView(view)

        val btnRefresh = view.findViewById<View>(R.id.btnRefresh) as Button
        //重新刷新数据
        RxView.clicks(btnRefresh).subscribe { aVoid -> onRefresh() }
    }

    fun showNullData() {
        mLayoutNull.visibility = View.VISIBLE
        val view = LayoutInflater.from(mActivity).inflate(R.layout.null_data, null)
        mLayoutNull.removeAllViews()
        mLayoutNull.addView(view)
    }

    fun hideNull() {
        mLayoutNull.visibility = View.GONE
        mLayoutNull.removeAllViews()
    }


    /**
     * 刷新列表
     *
     * @param resultList
     */
    fun showRefreshList(resultList: MutableList<M>) {
        mAdapter.refresh(resultList)
        mAdapter.notifyDataSetChanged()
        if (mSwipeToLoadLayout != null) {
            mSwipeToLoadLayout.isRefreshing = false
        }
        hideNull()
        //是否显示空内容
        if (resultList == null || resultList.isEmpty()) {
            showNullData()
        }
    }

    /**
     * 更多数据
     *
     * @param resultList
     */
    fun showMoreList(resultList: MutableList<M>) {
        mAdapter.add(resultList)
        mAdapter.notifyDataSetChanged()
        if (mSwipeToLoadLayout != null) {
            mSwipeToLoadLayout.isLoadingMore = false
        }
    }

    /**
     * 更新数据
     */
    fun showChanged(resultList: MutableList<M>, index: Int) {
        mAdapter.changed(resultList, index)
        mAdapter.notifyItemRangeChanged(index, resultList.size)

    }

    /**
     * 加载失败
     */
    fun showFailList() {
        if (mSwipeToLoadLayout != null) {
            mSwipeToLoadLayout.isRefreshing = false
            mSwipeToLoadLayout.isLoadingMore = false
        }
        hideNull()
        if (isRefresh) {
            //显示加载失败
            showNullNetwork()

        }
    }


}