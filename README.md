# Bài viết
Source code này làm DEMO cho bài viết [Tạo ứng dụng điện thoại báo cáo tình trạng coronavirus trong vòng 2 ngày](https://medium.com/@lapth82/t%E1%BA%A1o-%E1%BB%A9ng-d%E1%BB%A5ng-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-b%C3%A1o-c%C3%A1o-t%C3%ACnh-tr%E1%BA%A1ng-coronavirus-trong-v%C3%B2ng-2-ng%C3%A0y-588448ee2eea)

# Tải source code
PROJECT_FOLDER>git clone https://github.com/lapth/CoronavirusCheck.git

# Thư viện sử dụng:
1. React Native: 0.59.9 => sử dụng version này vì tính tới hiện tại với phiên bản 0.6x, các thư viện liên quan thường có nhiều lỗi andoridx cần thời gian để khắc phục.
2. react-navigation: để làm tabar phía dưới màn hình
3. react-native-webview: để làm màn hình thứ 3, hiển thị nội dùng liên quan đến coronavirus từ WHO
4. react-native-image-zoom-viewer: để làm phần phóng to, thu nhỏ ảnh ở màn hình thứ 2.
5. react-native-splash-screen: để làm màn hình chờ load ứng dụng.

# Cấu hình ứng dụng để chạy DEMO ở local
Repo này dùng cho DEMO nên bạn cần cấu hình lại để chạy local
## Cấu hình server Back-End
Bạn đổi IP:PORT server bạn tạo cho phần Back-End ở file SituationReport.js
```
static defaultProps = {
    realDataJson: 'http://IP:PORT/data/data.json',
    realDataWorldMap: 'http://IP:PORT/images/worldmap.png'
}
```
Phần này bạn có thể refactor code lại để đưa ra 1 file config thì sẻ đẹp hơn.

## Andorid

### Tạo keystore ứng dụng:
Bạn có thể dùng file coronavirus.keystore kèm theo cho DEMO ở local, nên bạn không cần làm lại bước này.

Nếu bạn muốn publish lên store, bạn nên tạo lại theo lệnh sau, và cấu hình lại file gradle.properties:
```
"%JAVA_HOME%/bin/keytool" -genkey -v -keystore coronavirus.keystore -alias coronavirus -keyalg RSA -keysize 2048 -validity 10000
```

### Tải node module
```
PROJECT_HOME>npm install
```

### Chạy thử ở chế độ debug
Giả định là bạn đã cấu hình để chạy với máy thực, nếu không bạn xem bài viết tại đây [Tạo ứng dụng điện thoại báo cáo tình trạng coronavirus trong vòng 2 ngày](https://medium.com/@lapth82/t%E1%BA%A1o-%E1%BB%A9ng-d%E1%BB%A5ng-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-b%C3%A1o-c%C3%A1o-t%C3%ACnh-tr%E1%BA%A1ng-coronavirus-trong-v%C3%B2ng-2-ng%C3%A0y-588448ee2eea).
```
PROJECT_HOME>react-native run-android
```

### Tạo file apk để tải lên store
```
PROJECT_HOME>cd android
PROJECT_HOME>gradlew clean assembleRelease
```
Sau lệnh này bạn sẻ thấy 4 files ở thư mục $PROJECT_HOME\android\app\build\outputs\apk\release\

Bạn có thể chạy thử file apk trước khi tải lên store bằng lện sau
```
PROJECT_HOME>adb install  $PROJECT_HOME\android\app\build\outputs\apk\release\app-arm64-v8a-release.apk
```
Tùy vào máy điện thoại bạn đang dùng, thay đổi lại file apk tương ứng

Sau khi kiểm thử apk ở máy thực, ứng dụng của bạn đã sẳn sàng upload lên store, sau khi upload xong, nó sẻ trông như thế này [Coronavirus Reports](https://play.google.com/store/apps/details?id=com.coronaviruscheck).

# Cải tiến
Do thời gian hạn chế, phần hiển thị dữ liệu còn chưa được bắt mắt, bạn có thể thêm 1 số tính năng như:
1. Hiển thị bản đồ các nước và thành phố đang bị nhiễm, một số thông tin chi tiết khi click vào vùng đó.
2. Hiển thị 1 chart thể hiện tình trạng lây nhiễm qua mỗi ngày, tuần, ...
3. Hiển thị những hot news từ các báo
4. Localization ...

Để phần DEMO này tốt hơn cho cộng đồng mình welcome tất cả PRs (* _ *)

**Chúc bạn thành công!**