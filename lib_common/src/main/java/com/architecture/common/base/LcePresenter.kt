package com.architecture.common.base

/**
 * created by xuying at 2018/1/24
 */
interface LcePresenter<T> : IPresenter<T> {
    //获取刷新的列表
    fun getRefreshList()

    //获取更多的列表
    fun getMoreList()

}