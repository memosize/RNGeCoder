package com.newrntest.geCoder;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.util.Log;

import com.facebook.react.bridge.Callback;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class convertCoordinateToCity {
    private static final String TAG = "GeCoder";
    public static void getAddressFromLocation(
            String lat, String lon, final Context context, Callback callback) {
            Thread thread = new Thread() {
            @Override public void run() {
                Geocoder geocoder = new Geocoder(context, Locale.getDefault());
                String result = null;
                try {
                    List<Address> list = geocoder.getFromLocation(
                            Double.parseDouble(lat), Double.parseDouble(lon), 1);
                    if (list != null && list.size() > 0) {
                        Address address = list.get(0);
                        // sending back first address line and locality
                        result = address.getLocality();
                        callback.invoke(result);
                    }
                } catch (IOException e) {
                    Log.e(TAG, "Impossible to connect to Geocoder", e);
                }

            }
        };
        thread.start();
    }
}
