package com.architecture.common.base

/**
 * 基本列表的presenter
 * M数据类型
 * V视图类型
 * Created by xuying on 2018/2/12.
 */
abstract class BaseListPresenter<M, V : LceView<M>> : BasePresenter<V>(), LcePresenter<V> {

    override fun takeView(view: V) {
        super.takeView(view)
        getRefreshList()
    }
}