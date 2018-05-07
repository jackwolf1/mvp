package com.architecture.common.base

import com.trello.rxlifecycle2.components.support.RxFragment


/**
 * created by xuying at 2018/1/24
 */
open interface BaseView : IView {


    fun showWaitDialog(content: String)

    fun hideDialog()

    fun showError(value: String)

    fun showSuccess(value: String)

    fun showInfo(value: String)

    fun getRxFrament(): RxFragment

    fun finishActivity()

}