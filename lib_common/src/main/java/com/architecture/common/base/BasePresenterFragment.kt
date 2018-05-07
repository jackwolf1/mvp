package com.architecture.common.base


/**
 * @param V 这个组中的成员的类型。继承
 * @see IView
 * @param P 这个组中的成员的类型。继承
 * @see IPresenter
 * @constructor 创建一个包含presenter的fragment
 * created by xuying at 2018/1/25
 */
abstract class BasePresenterFragment<V : IView, P : IPresenter<V>> : BaseDaggerFragment<V, P>() {

    /**
     * 懒加载的时候，传递view到presenter
     */
    override fun lazyLoad() {
        getPresenter().takeView(this as V)
    }

    abstract fun getPresenter(): IPresenter<V>

    override fun onDestroy() {
        super.onDestroy()
        getPresenter().dropView()

    }
}