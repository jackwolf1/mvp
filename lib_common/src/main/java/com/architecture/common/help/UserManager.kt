package com.jungou.business.help

import com.architecture.common.base.BaseApplication
import com.architecture.common.help.PreferenceConstant
import com.architecture.common.util.PreferenceKT


/**
 * Created by Administrator on 2018/1/22.
 */
object UserManager {


    private val context = BaseApplication.context()


    var userName: String by PreferenceKT(context, PreferenceConstant.UserName, "")
    var password: String by PreferenceKT(context, PreferenceConstant.Password, "")
    var ticket: String by PreferenceKT(context, PreferenceConstant.Ticket, "")
    var storeId: Int by PreferenceKT(context, PreferenceConstant.StroeID, -1)
    var status: Int by PreferenceKT(context, PreferenceConstant.Status, -1)

    fun isLogin(): Boolean {
        return UserManager.userName != "" && UserManager.ticket != "" && UserManager.storeId != -1
    }

    fun saveUser(username: String, ticket: String, storeId: Int, status: Int) {
        UserManager.userName = username
        UserManager.ticket = ticket
        UserManager.storeId = storeId
        UserManager.status = status
    }

    //退出登录
    fun logout() {
        UserManager.userName = ""
        UserManager.ticket = ""
        UserManager.storeId = -1
        UserManager.status = -1

    }


}