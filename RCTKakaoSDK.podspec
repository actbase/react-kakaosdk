require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name          = "RCTKakaoSDK"
  s.version       = package['version']
  s.summary       = package['description']
  
  s.authors       = { "Actbase LLC" => "project@actbase.io" }
  s.homepage      = package['homepage']
  s.license       = package['license']

  s.platform      = :ios, "11.0"
  s.framework     = 'UIKit'
  s.requires_arc  = true

  s.source        = { :git => package['repository']['url'] }
  s.source_files  = "ios/*.{h,m,swift}"

  s.dependency "React"
  s.dependency "KakaoSDK", "2.4.1"
end

  

