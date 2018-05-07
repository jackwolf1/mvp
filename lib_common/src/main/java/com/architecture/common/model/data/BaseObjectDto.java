package com.architecture.common.model.data;

/**
 * 列表数据
 * Created by Administrator on 2016/9/23.
 */
public class BaseObjectDto<T> extends BaseDto {
    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
