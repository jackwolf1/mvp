package com.mvp.tfkj.login.module

import com.architecture.common.di.ActivityScoped
import com.mvp.tfkj.login.activity.UserLoginActivity
import dagger.Module
import dagger.android.ContributesAndroidInjector

/**
 * Created by Administrator on 2018/5/3.
 */
@Module
abstract class LoginModule {

    @ActivityScoped
    @ContributesAndroidInjector(modules = arrayOf(LoginUserModule::class))
    abstract fun userLoginActivity(): UserLoginActivity
}
