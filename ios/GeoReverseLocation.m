//
//  GeoReverseLocation.m
//  NewRNTest
//
//  Created by mikis on 2022/8/2.
//

#import "GeoReverseLocation.h"
#import<CoreLocation/CoreLocation.h>

@implementation GeoReverseLocation
-(void)convertToAddressFrom: (NSString *)lat lon:(NSString *)lon completion:(nonnull CompltionBlock)compblock  {
  CLLocationDegrees latitude=[lat doubleValue];
  CLLocationDegrees longitude=[lon doubleValue];
  CLLocation * location = [[CLLocation alloc] initWithLatitude: latitude longitude:longitude];
  __block NSString * city = @"";
  CLGeocoder * geocoder = [[CLGeocoder alloc] init];

  [geocoder reverseGeocodeLocation:location completionHandler:^(NSArray *placemarks, NSError *error) {
    if (error != nil){
      NSLog(@"Geocode failed with error: %@", error);
      return;
    }
    if (placemarks && placemarks.count > 0) {
      CLPlacemark * firPlacemark = [placemarks firstObject];
      NSLog(@"placemarks = %@",firPlacemark);
      NSLog(@"city = %@",firPlacemark.locality);
      city = firPlacemark.locality;
    }
    if (compblock){
      compblock(city);
    }
  }];
}

@end
