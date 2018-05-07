package com.architecture.common.base

import android.content.Context
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.InputMethodManager
import butterknife.ButterKnife
import com.trello.rxlifecycle2.components.support.RxFragment
import dagger.android.AndroidInjector
import dagger.android.DispatchingAndroidInjector
import dagger.android.support.AndroidSupportInjection
import dagger.android.support.HasSupportFragmentInjector
import io.reactivex.Observable
import io.reactivex.android.schedulers.AndroidSchedulers
import me.leefeng.promptlibrary.PromptDialog
import java.util.concurrent.TimeUnit
import javax.inject.Inject


/**
 *
 * @param V 这个组中的成员的类型。继承
 * @see IView
 * @param P 这个组中的成员的类型。继承
 * @see IPresenter
 * @constructor 创建一个注入的fragment
 * created by xuying at 2018/1/24
 *
 */
abstract class BaseDaggerFragment<V : IView, P : IPresenter<V>> : RxFragment(), HasSupportFragmentInjector, BaseView {

    @Inject
    lateinit var childFragmentInjector: DispatchingAndroidInjector<Fragment>

    override fun onAttach(context: Context) {
        AndroidSupportInjection.inject(this)
        super.onAttach(context)
    }

    override fun supportFragmentInjector(): AndroidInjector<Fragment>? {
        return childFragmentInjector
    }


    protected lateinit var mInflater: LayoutInflater
    // 对应显示的view
    protected lateinit var mView: View
    protected lateinit var mActivity: BaseDaggerActivity

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        mActivity = activity as BaseDaggerActivity
        this.mInflater = inflater
        mView = mInflater.inflate(initLayoutId(), null)
        ButterKnife.bind(this, mView)
        return mView
    }

    /**
     * 设置界面ID
     */
    abstract fun initLayoutId(): Int

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        //初始化界面,可用于初始化标题，初始化监听器等
        initView()
    }

    protected abstract fun initView()


    var dialog: PromptDialog? = null
    override fun showWaitDialog(content: String) {
        if (dialog == null) {
            dialog = PromptDialog(mActivity)
        } else {
            dialog?.showLoading(content)
        }

    }


    override fun hideDialog() {
        dialog?.dismissImmediately()
    }

    override fun showError(value: String) {
        hideInputMethod()
        var dialog = PromptDialog(mActivity)
        Observable.timer(200, TimeUnit.MILLISECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    dialog.showError(value, false)
                }
        Observable.timer(2, TimeUnit.SECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    dialog.dismissImmediately()
                }

    }

    override fun showSuccess(value: String){
        hideInputMethod()
        var dialog = PromptDialog(mActivity)
        Observable.timer(200, TimeUnit.MILLISECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    dialog.showSuccess(value, false)
                }

        Observable.timer(2, TimeUnit.SECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    dialog.dismissImmediately()
                }
    }

    override fun showInfo(value: String) {
        hideInputMethod()
        var dialog = PromptDialog(mActivity)
        Observable.timer(200, TimeUnit.MILLISECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    dialog.showInfo(value, false)
                }
        Observable.timer(2, TimeUnit.SECONDS)
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe {
                    dialog.dismissImmediately()
                }

    }

    open fun hideInputMethod() {
        (mActivity.getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager)
                .hideSoftInputFromWindow(mView.applicationWindowToken, 0)
    }


    override fun getRxFrament(): RxFragment {
        return this
    }

    override fun finishActivity() {
        mActivity.finish()
    }

    /**
     * 懒加载实现
     */
    var isViewInitiated = false
    var isVisibleToUser = false
    var isDataInitiated = false

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        isViewInitiated = true
        prepareFetchData()
    }

    //add,hide时的懒加载
    override fun onHiddenChanged(isVisibleToUser: Boolean) {
        super.setUserVisibleHint(isVisibleToUser)
        this.isVisibleToUser = !isVisibleToUser
        prepareFetchData()
    }

    //FragmentPagerAdapter+ViewPage时的懒加载
    override fun setUserVisibleHint(isVisibleToUser: Boolean) {
        super.setUserVisibleHint(isVisibleToUser)
        this.isVisibleToUser = isVisibleToUser
        prepareFetchData()
    }

    //懒加载刷新数据
    protected abstract fun lazyLoad()

    //不强制刷新懒加载
    open fun prepareFetchData(): Boolean {

        return prepareFetchData(false)
    }

    protected fun prepareFetchData(forceUpdate: Boolean): Boolean {
        if (isVisibleToUser && isViewInitiated && (!isDataInitiated || forceUpdate)) {
            lazyLoad()
            isDataInitiated = true
            return true
        }
        return false
    }

}
