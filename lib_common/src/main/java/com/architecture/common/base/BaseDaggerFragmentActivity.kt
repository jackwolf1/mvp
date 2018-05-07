package com.architecture.common.base

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v4.app.FragmentManager
import android.support.v4.app.FragmentTransaction
import android.support.v7.app.AppCompatActivity
import com.architecture.common.R


/**
 * 防止重复加载fragment
 * created by xuying at 2018/1/24
 */
abstract class BaseDaggerFragmentActivity : BaseDaggerActivity() {

    private val IS_ADDED = "IS_ADDED"

    private lateinit var mFragment: Fragment
    override fun initLayoutId(): Int {
        return R.layout.activity_base
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mFragment = initFragment()
        mFragment.arguments = mActivity.intent.extras
        if (savedInstanceState == null) {
            addFragment(mFragment, R.id.contentFrame)
            hideFragment(mFragment)
            showFragment(mFragment)
        } else {
            val isAdd = savedInstanceState?.getBoolean(IS_ADDED)
            if (!isAdd) {
                addFragment(mFragment, R.id.contentFrame)
                hideFragment(mFragment)
                showFragment(mFragment)
            }
        }

    }

    inline fun FragmentManager.inTransaction(func: FragmentTransaction.() -> FragmentTransaction) {
        beginTransaction().func().commit()
    }


    fun AppCompatActivity.addFragment(fragment: Fragment, frameId: Int) {
        supportFragmentManager.inTransaction { add(frameId, fragment) }
    }

    fun AppCompatActivity.showFragment(fragment: Fragment) {
        supportFragmentManager.inTransaction { show(fragment) }
    }

    fun AppCompatActivity.hideFragment(fragment: Fragment) {
        supportFragmentManager.inTransaction { hide(fragment) }
    }

    fun AppCompatActivity.replaceFragment(fragment: Fragment, frameId: Int) {
        supportFragmentManager.inTransaction { replace(frameId, fragment) }
    }

    abstract fun initFragment(): Fragment

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        /*在这里，我们通过碎片管理器中的Tag，就是每个碎片的名称，来获取对应的fragment*/
        val f = supportFragmentManager.findFragmentById(R.id.contentFrame)
        f.onActivityResult(requestCode, resultCode, data)
    }

    public override fun onSaveInstanceState(outState: Bundle?) {
        outState?.putBoolean(IS_ADDED, mFragment.isAdded)
        super.onSaveInstanceState(outState)
    }


}
