package com.mvp.tfkj.login.model

import com.architecture.common.help.WebManager
import com.architecture.common.model.data.BaseDto
import com.architecture.common.util.MD5
import com.mvp.tfkj.lib_model.login.data.UserLogin
import com.mvp.tfkj.lib_model.login.service.AccountService
import io.reactivex.Observable
import java.security.NoSuchAlgorithmException
import javax.inject.Inject

/**
 * Created by xuying on 2018/2/9.
 */
/**
 * 用户相关的模型
 * Created by Administrator on 2016/10/8.
 */

class AccountModel @Inject constructor() {

    @Inject
    lateinit var mService: AccountService

    /**
     * 登录
     *
     * @param phone
     * @param password
     * @return
     */
    fun login(phone: String, password: String): Observable<UserLogin> {
        var password = password
        try {
            password = MD5.getMD5(password)
        } catch (e: NoSuchAlgorithmException) {
            e.printStackTrace()
        }

        return mService.login(phone, password).flatMap({ WebManager.flatResult(it) }).map { it.data }
    }


}
