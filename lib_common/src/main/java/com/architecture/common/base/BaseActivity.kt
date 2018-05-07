package com.architecture.common.base

import android.app.Activity
import android.os.Bundle
import android.support.annotation.Nullable
import android.support.v7.widget.Toolbar
import android.view.View
import android.widget.TextView
import butterknife.BindView
import butterknife.ButterKnife
import com.architecture.common.R

import com.architecture.common.R2
import com.jakewharton.rxbinding2.view.RxView
import com.trello.rxlifecycle2.components.support.RxAppCompatActivity
import io.reactivex.functions.Consumer
import java.util.concurrent.TimeUnit

/**
 * created by xuying at 2018/1/24
 */
abstract class BaseActivity : RxAppCompatActivity() {

    @Nullable
    @BindView(R2.id.toolbar)
    lateinit var toolbar: Toolbar
    @Nullable

    @BindView(R2.id.tvTitle)
    lateinit var tvTitle: TextView
    //可以为空右侧标题文字
    @Nullable
    @BindView(R2.id.tvRight)
    lateinit var tvRight: TextView


    lateinit var mActivity: Activity


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(initLayoutId())
        mActivity = this
        // 通过注解绑定控件
        ButterKnife.bind(this)
        initActionBar()

    }

    private fun initActionBar() {
        if (toolbar != null) {
            toolbar?.setNavigationIcon(setNavigationIcon())
            //设置actionbar
            setSupportActionBar(toolbar)
            supportActionBar!!.setDisplayHomeAsUpEnabled(false)
            supportActionBar!!.setDisplayShowHomeEnabled(false)
            supportActionBar!!.title = ""
        }

    }

    open protected fun setNavigationIcon(): Int {
        return R.drawable.btn_back_white
    }

    protected abstract fun initLayoutId(): Int

    /**
     * ActionBar返回键
     *
     * @return
     */
    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        return true
    }

    fun setTitle(value: String) {
        showTitle()
        tvTitle.text = value
    }


    fun setTitleAlpha(alpha: Float) {
        toolbar.alpha = alpha
    }

    fun showTitle() {
        supportActionBar!!.show()
        toolbar.alpha = 1f
    }

    fun setNavigationIcon(id: Int) {
        toolbar.setNavigationIcon(id)
    }

    fun hideTitle() {
        supportActionBar!!.hide()
    }


    fun setDisplayHomeAsUpEnabled(value: Boolean) {
        supportActionBar!!.setDisplayHomeAsUpEnabled(value)
    }

    fun setTitleRightButton(value: String, onNext: Consumer<Any>?) {
        if (value != "") {
            tvRight.text = value
            tvRight.visibility = View.VISIBLE
        } else {
            tvRight.visibility = View.GONE
        }
        if (onNext != null)
            RxView.clicks(tvRight!!).throttleFirst(300, TimeUnit.MILLISECONDS)   //防抖操作
                    .subscribe(onNext)
    }


}