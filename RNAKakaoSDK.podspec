require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = "RNAKakaoSDK"
  s.version        = package['version']
  s.summary        = package['description']

  s.authors        = { "Actbase LLC" => "project@actbase.io" }
  s.homepage       = package['homepage']
  s.license        = package['license']

  s.platform       = :ios, "11.0"
  s.framework      = 'MobileCoreServices'
  s.requires_arc   = true

  s.source         = { :git => package['repository']['url'] }
  s.source_files   = "ios/*.{h,m,swift}"

  s.swift_version = '5.1'

  s.ios.deployment_target = '11.0'
  s.ios.framework         = 'MobileCoreServices'

  s.dependency 'React'
  s.dependency 'React-Core'
  s.dependency 'KakaoSDK', '2.9.1'

  s.xcconfig = {
    "ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES" => "YES",
    "EMBEDDED_CONTENT_CONTAINS_SWIFT" => "YES"
  }
  s.pod_target_xcconfig = {
    "ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES" => "YES",
    "EMBEDDED_CONTENT_CONTAINS_SWIFT" => "YES"
  }
#  s.pod_target_xcconfig = { 'SWIFT_OBJC_BRIDGING_HEADER' => '${PODS_TARGET_SRCROOT}/ios/RNAKakaoSDK-Bridging-Header.h' }
end



