# Thư viện sử dụng:
1. React Native: 0.59.9 => sử dụng version này vì tính tới hiện tại với phiên bản 0.6x, các thư viện liên quan thường có nhiều lỗi andoridx cần thời gian để khác phục.
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
Giả định là bạn đã cấu hình để chạy với máy thực, nếu không bạn xem bài viết tại đây TBDXXXXX.
```
PROJECT_HOME>react-native run-android
```

### Tạo file apk để tải lên store
```
PROJECT_HOME>cd android
gradlew clean assembleRelease
```
Sau lệnh này bạn sẻ thấy 4 files ở thử mục $PROJECT_HOME\android\app\build\outputs\apk\release\

Bạn có thể chạy thử file apk trước khi tải lên store bằng lện sau
```
PROJECT_HOME>adb install  android\app\build\outputs\apk\release\app-arm64-v8a-release.apk
```
Tùy vào máy điện thoại bạn đang dùng, thay đổi lại file apk tương ứng

Sau khi kiểm thử apk ở local, ứng dụng của bạn đã sẳn sàng upload lên store, sau khi upload xong, nó sẻ trông như thế này [Coronavirus Reports](https://play.google.com/store/apps/details?id=com.coronaviruscheck).

**Chúc bạn thành công!**