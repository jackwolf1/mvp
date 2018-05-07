package com.architecture.common.base

import java.lang.ref.WeakReference

/**
 * created by xuying at 2018/1/24
 */
open class BasePresenter<V : BaseView> : IPresenter<V> {

    private var viewRef: WeakReference<V>? = null
    protected lateinit var mView: V

    override fun takeView(view: V) {
        viewRef = WeakReference(view)
        this.mView = viewRef!!.get()!!
    }


    override fun dropView() {
        if (viewRef != null) {
            viewRef!!.clear()
            viewRef = null
        }
    }
}