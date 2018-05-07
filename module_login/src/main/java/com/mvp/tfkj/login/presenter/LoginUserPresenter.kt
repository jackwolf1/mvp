package com.mvp.tfkj.login.presenter

import com.architecture.common.base.BasePresenter
import com.architecture.common.di.ActivityScoped
import com.architecture.common.help.WebManager
import com.mvp.tfkj.login.config.UserInputConstant
import com.mvp.tfkj.login.contract.LoginUserContract
import com.mvp.tfkj.login.model.AccountModel
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import javax.inject.Inject

/**
 * Created by Administrator on 2018/1/19.
 */
@ActivityScoped
class LoginUserPresenter @Inject constructor() : BasePresenter<LoginUserContract.View>(), LoginUserContract.Presenter {
    @Inject
    lateinit var mModel: AccountModel

    override fun isPhoneValid(phone: String): Boolean {
        return phone.trim().length == UserInputConstant.PhoneLength
    }

    override fun isPasswordValid(password: String): Boolean {
        return password.trim().length >= UserInputConstant.PasswordMinLength && password.trim().length <= UserInputConstant.PasswordLength
    }

    override fun login(phone: String, password: String) {
        mView.showWaitDialog("正在登录，请稍候。。。")
        mModel.login(phone, password)
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .doFinally { mView.hideDialog() }
                .subscribe({ value ->
                    mView.loginSuccess()
                }, { throwable ->
                    mView.showError(WebManager.setThrowable(throwable))
                })

    }

}