package com.shipperapp;

import android.util.Log;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.util.HashMap;
import java.util.Map;

public class ActivityStateModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private static final String MODULE_NAME = "ActivityAndroid";

    public ActivityStateModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Override
    public void onHostResume() {
        sendEvent("onResume");
    }

    @Override
    public void onHostPause() {
        // Handle onPause if needed
    }

    @Override
    public void onHostDestroy() {
        sendEvent("onDestroy");
        Log.d("ActivityStateModule", "onHostDestroy");
    }

    private void sendEvent(String eventName) {
        ReactApplicationContext reactContext = getReactApplicationContext();
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, null);
        }
    }

    @Override
    public void initialize() {
        super.initialize();
    }

    @Override
    public void invalidate() {
        super.invalidate();
    }

    @NonNull
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("addListener", "addListener");
        constants.put("removeListeners", "removeListeners");
        return constants;
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Set up any upstream listeners or background tasks as necessary
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Remove upstream listeners, stop unnecessary background tasks
    }
}
