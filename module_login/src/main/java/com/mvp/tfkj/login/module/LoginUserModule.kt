package com.mvp.tfkj.login.module

import com.architecture.common.di.ActivityScoped
import com.architecture.common.di.FragmentScoped
import com.mvp.tfkj.login.contract.LoginUserContract
import com.mvp.tfkj.login.fragment.LoginFragment
import com.mvp.tfkj.login.presenter.LoginUserPresenter
import dagger.Binds
import dagger.Module
import dagger.android.ContributesAndroidInjector


/**
 * Created by Administrator on 2018/1/18.
 */
@Module
abstract class LoginUserModule {

    @FragmentScoped
    @ContributesAndroidInjector
    internal abstract fun loginUserFragment(): LoginFragment

    @ActivityScoped
    @Binds
    internal abstract fun loginUserPresenter(presenter: LoginUserPresenter): LoginUserContract.Presenter


}