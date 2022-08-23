package com.newrntest.geCoder;
import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GeCoderModule extends ReactContextBaseJavaModule {
    private Context context = null;
    public GeCoderModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }
    @Override
    public String getName() {
        return "GeCoderModule";
    }
    @ReactMethod
    public void getCityFromCoordinate(String lat, String lon, Callback callback) {
        System.out.println("lat: "+lat + " lon: "+lon);
        convertCoordinateToCity.getAddressFromLocation(lat, lon, context, callback);
    }
}
/**
 * package com.your-app-name; // replace com.your-app-name with your app’s name
 * import com.facebook.react.bridge.NativeModule;
 * import com.facebook.react.bridge.ReactApplicationContext;
 * import com.facebook.react.bridge.ReactContext;
 * import com.facebook.react.bridge.ReactContextBaseJavaModule;
 * import com.facebook.react.bridge.ReactMethod;
 * import java.util.Map;
 * import java.util.HashMap;
 *
 * public class CalendarModule extends ReactContextBaseJavaModule {
 *    CalendarModule(ReactApplicationContext context) {
 *        super(context);
 *    }
 * }
 */
