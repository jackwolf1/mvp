package com.mvp.tfkj.login.module

import com.architecture.common.di.DefaultRetrofit
import com.architecture.common.di.Remote
import com.mvp.tfkj.lib_model.login.service.AccountService
import com.mvp.tfkj.login.model.AccountModel
import dagger.Module
import dagger.Provides
import javax.inject.Singleton

/**
 * Created by xuying on 2018/1/26.
 */
@Module
class ModelModule {

    @Remote
    @Provides
    fun accountModel(): AccountModel {
        return AccountModel()
    }

    @Singleton
    @Provides
    fun accountService(retrofit: DefaultRetrofit): AccountService {
        return retrofit.getRetrofit().create(AccountService::class.java)
    }

}