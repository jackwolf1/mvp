package com.mvp.tfkj.login.activity

import android.support.v4.app.Fragment
import com.alibaba.android.arouter.facade.annotation.Route
import com.architecture.common.base.BaseDaggerFragmentActivity
import com.mvp.tfkj.login.fragment.LoginFragment
import javax.inject.Inject

/**
 * Created by Administrator on 2018/1/19.
 */
@Route(path = "/login/UserLoginActivity")
class UserLoginActivity : BaseDaggerFragmentActivity() {
    @Inject
    lateinit var mFragment: LoginFragment


    override fun initFragment(): Fragment {
        return mFragment
    }

}