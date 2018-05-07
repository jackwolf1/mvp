package com.mvp.tfkj.login.fragment

import android.support.design.widget.Snackbar
import android.text.InputFilter
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import butterknife.BindView
import butterknife.OnClick
import com.alibaba.android.arouter.launcher.ARouter
import com.architecture.common.base.BasePresenterFragment
import com.architecture.common.base.IPresenter
import com.jakewharton.rxbinding2.view.RxView
import com.jakewharton.rxbinding2.widget.RxTextView
import com.mvp.tfkj.login.R
import com.mvp.tfkj.login.R2

import com.mvp.tfkj.login.config.UserInputConstant
import com.mvp.tfkj.login.contract.LoginUserContract
import com.mvp.tfkj.login.presenter.LoginUserPresenter

import io.reactivex.Observable
import io.reactivex.functions.BiFunction
import java.util.concurrent.TimeUnit
import javax.inject.Inject

/**
 * 用户密码登录
 * 实现懒加载
 * Created by Administrator on 2018/1/18.
 */
class LoginFragment @Inject constructor() : BasePresenterFragment<LoginUserContract.View, LoginUserContract.Presenter>(), LoginUserContract.View {


    @Inject
    lateinit var mPresenter: LoginUserContract.Presenter

    @BindView(R2.id.btnSubmit)
    lateinit var mBtnSubmit: Button
    @BindView(R2.id.edtPhone)
    lateinit var mEdtPhone: EditText
    @BindView(R2.id.edtPassword)
    lateinit var mEdtPassword: EditText
    @BindView(R2.id.imgClean)
    lateinit var mImgClean: ImageView

    override fun initLayoutId(): Int {
        return R.layout.fragment_login_password
    }

    override fun getPresenter(): IPresenter<LoginUserContract.View> {
        return mPresenter
    }

    override fun initView() {
        //设置输入长度
        mEdtPhone.filters = arrayOf<InputFilter>(InputFilter.LengthFilter(
                UserInputConstant.PhoneLength))
        mEdtPassword.filters = arrayOf<InputFilter>(InputFilter.LengthFilter(
                UserInputConstant.PasswordLength))

        //设置输入内容
        setInput()
        //设置点击事件
        RxView.clicks(mBtnSubmit).throttleFirst(500, TimeUnit.MILLISECONDS)
                .subscribe { mPresenter.login(mEdtPhone.text.toString().trim(), mEdtPassword.text.toString().trim()) }
        RxView.clicks(mImgClean)
                .subscribe { mEdtPhone.setText("") }
    }


    private fun setInput() {
        //设置输入要求
        mEdtPhone.filters = arrayOf<InputFilter>(InputFilter.LengthFilter(
                UserInputConstant.PhoneLength))
        mEdtPassword.filters = arrayOf<InputFilter>(InputFilter.LengthFilter(
                UserInputConstant.PasswordLength))
        //清空数据
        RxView.clicks(mImgClean).throttleFirst(1, TimeUnit.SECONDS)
                .subscribe {
                    mEdtPhone.setText("")
                }

        val observablePhone = RxTextView.textChanges(mEdtPhone)
        val observablePassword = RxTextView.textChanges(mEdtPassword)

        Observable.combineLatest(observablePhone, observablePassword, BiFunction<CharSequence, CharSequence, Boolean> { c1, c2 ->
            mPresenter.isPhoneValid(c1.toString()) && mPresenter.isPasswordValid(c2.toString())
        }).subscribe { mBtnSubmit.isEnabled = it }


    }


    @OnClick(R2.id.tvForgetPassword)
    override fun showResetPasswordActivity() {
//        ActivityManager.ResetPasswordActivity(mActivity)
    }


    override fun loginSuccess() {
        //发起路由跳转
        ARouter.getInstance().build("/com/Activity1").navigation()
//        finishActivity()
//        ActivityManager.MainActivity(mActivity)
    }

}