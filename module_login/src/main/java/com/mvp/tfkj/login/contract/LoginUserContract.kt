package com.mvp.tfkj.login.contract

import com.architecture.common.base.BaseView
import com.architecture.common.base.IPresenter

/**
 * Created by xuying on 2018/1/18.
 */
interface LoginUserContract {
    interface View : BaseView {
        //显示忘记密码界面
        fun showResetPasswordActivity()

        //登录成功
        fun loginSuccess()


    }

    interface Presenter : IPresenter<View> {

        fun isPhoneValid(phone: String): Boolean

        fun isPasswordValid(password: String): Boolean
        //登录
        fun login(phone: String, password: String)

    }
}