package com.architecture.common.model.data;

import java.util.List;

/**
 * Created by Administrator on 2018/4/7 0007.
 */

public class BasePagerListData<T> {
    int total;
    int totalBalance;
    int nextStart;
    int size;
    private List<T> list;


    public int getNextStart() {
        return nextStart;
    }

    public void setNextStart(int nextStart) {
        this.nextStart = nextStart;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getTotalBalance() {
        return totalBalance;
    }

    public void setTotalBalance(int totalBalance) {
        this.totalBalance = totalBalance;
    }
}
