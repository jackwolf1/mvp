package com.architecture.common.help;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;


import com.architecture.common.config.WebConstants;
import com.architecture.common.model.PageListModel;
import com.architecture.common.model.data.BaseDto;
import com.architecture.common.model.data.BasePageListDto;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import io.reactivex.Observable;

/**
 * 网络数据统一处理
 * Administrator on 2016/8/10.
 */
public class WebManager {


    public static final String Error = "Error";

    /**
     * 所有数据的统一处理
     *
     * @param dto
     * @param <T>
     * @return
     */
    public static <T extends BaseDto> Observable<T> flatResult(T dto) {
        return Observable.create(subscriber -> {
            switch (dto.getCode()) {
                case WebConstants.Success:
                    subscriber.onNext(dto);
                    break;
                default:
                    subscriber.onError(new Exception(Error, new Throwable(dto.getMessage().toString())));
                    break;
            }
            subscriber.onComplete();
        });
    }

    /**
     * 设置列表的统一数据处理
     *
     * @param dto
     * @param model
     * @param <T>
     * @return
     */
    public static <T extends BasePageListDto> Observable<T> flatResult(T dto, PageListModel model) {
        //设置大小
        //设置下一页开始位置
        model.setNextStart(dto.getData().getNextStart());
        return flatResult(dto);
    }

    /**
     * 处理错误信息
     *
     * @param throwable
     * @return
     */
    public static String setThrowable(Throwable throwable) {
        try {
            if (throwable.getMessage().equals(Error)) {
                return throwable.getCause().getMessage();
            } else {
                return "网络连接失败";
            }
        } catch (Exception ex) {
            return "网络连接失败";
        }
    }

    /**
     * TODO:将图片以Base64方式编码为字符串
     *
     * @param imgUrl 图片的绝对路径（例如：D:\\jsontest\\abc.jpg）
     * @return 编码后的字符串
     * @throws IOException
     */
    public static String UrlToBase64(String imgUrl) {

        Bitmap bm = getSmallBitmap(imgUrl);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bm.compress(Bitmap.CompressFormat.JPEG, 40, baos);
        byte[] b = baos.toByteArray();
        return Base64.encodeToString(b, Base64.DEFAULT);

//        FileInputStream fis = null;
//        try {
//            fis = new FileInputStream(imgUrl);
//            byte[] rs = new byte[fis.available()];
//            fis.read(rs);
//            fis.close();
//            String result = Base64.encodeToString(rs, Base64.DEFAULT);
//            return result;
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return null;

    }

    // 根据路径获得图片并压缩，返回bitmap用于显示
    public static Bitmap getSmallBitmap(String filePath) {
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(filePath, options);

        // Calculate inSampleSize
        options.inSampleSize = calculateInSampleSize(options, 800, 480);
        // Decode bitmap with inSampleSize set
        options.inJustDecodeBounds = false;

        return BitmapFactory.decodeFile(filePath, options);
    }

    //计算图片的缩放值
    public static int calculateInSampleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {
        final int height = options.outHeight;
        final int width = options.outWidth;
        int inSampleSize = 1;

        if (height > reqHeight || width > reqWidth) {
            final int heightRatio = Math.round((float) height / (float) reqHeight);
            final int widthRatio = Math.round((float) width / (float) reqWidth);
            inSampleSize = heightRatio < widthRatio ? heightRatio : widthRatio;
        }
        return inSampleSize;
    }
}

