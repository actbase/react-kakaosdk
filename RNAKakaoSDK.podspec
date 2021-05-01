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
  s.framework      = 'UIKit'
  s.requires_arc   = true

  s.source         = { :git => package['repository']['url'] }
  s.source_files   = "ios/*.{h,m,swift}"

  s.ios.deployment_target = '11.0'
  s.swift_versions = ['5.1', '5.2', '5.3']

  s.dependency "React"
  s.dependency "KakaoSDK", "2.5.0"
end



