//
//  GecoderModule.m
//  NewRNTest
//
//  Created by mikis on 2022/8/2.
//

#import "GecoderModule.h"
#import <React/RCTLog.h>
#import "GeoReverseLocation.h"
@implementation RCTGeCoderModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE(GeCoderModule);
RCT_EXPORT_METHOD(getCityFromCoordinate:(NSString *)lat log:(NSString *)lon callback:(RCTResponseSenderBlock)callback)
{
  GeoReverseLocation * geoReverseLocation = [[GeoReverseLocation alloc] init];
  RCTLogInfo(@"position is %@ and %@", lat, lon);
  [geoReverseLocation convertToAddressFrom:lat lon:lon completion:^(NSString * city) {
    callback(@[city]);
  }];
}
@end
