// Encode-HttpParams-Angular
import { HttpParameterCodec } from '@angular/common/http'

export class URLNoEncoder implements HttpParameterCodec {

    encodeKey(key: string): string {
        // bỏ encodeURIComponent(key) nếu không muốn url endcode key truyền lên
        return encodeURIComponent(key);
    }
    encodeValue(value: string): string {
        // bỏ encodeURIComponent(value) nếu không muốn url endcode giá trị params truyền lên
        return value;
    }
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }
    decodeValue(value: string) {
        return decodeURIComponent(value);
    }
}