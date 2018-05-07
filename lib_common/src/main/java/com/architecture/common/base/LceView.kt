package com.architecture.common.base

/**
 * created by xuying at 2018/1/24
 */
interface LceView<M> : BaseView {

    //显示正在刷新
    fun showWaiting()

    //显示刷新数据
    fun showRefreshList(resultList: MutableList<M>)

    //显示更多数据
    fun showMoreList(resultList: MutableList<M>)

    //显示列表失败
    fun showFailList()

    //更新数据
    fun showChanged(resultList: MutableList<M>, index: Int)


}