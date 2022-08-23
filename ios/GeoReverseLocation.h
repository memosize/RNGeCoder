//
//  GeoReverseLocation.h
//  NewRNTest
//
//  Created by mikis on 2022/8/2.
//

#import <Foundation/Foundation.h>
typedef void (^CompltionBlock) (NSString* city);

NS_ASSUME_NONNULL_BEGIN

@interface GeoReverseLocation : NSObject
-(void)convertToAddressFrom: (NSString *)lat lon:(NSString *)lon completion: (CompltionBlock) compblock;
@property(nonatomic, copy) CompltionBlock compltionBlock;

@end

NS_ASSUME_NONNULL_END
