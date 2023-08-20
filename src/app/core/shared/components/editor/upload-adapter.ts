// https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/upload-adapter.html
import { Subscription } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { UploadService } from "src/app/core/services/upload.service";
import { MessageService } from "src/app/core/services/message.service";

export class CustomUploadAdapter {
  loader: any;
  private _subscription = new Subscription();

  constructor(
    loader: any,
    private uploadService: UploadService,
    private messageService: MessageService
  ) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file: any) => {
      return new Promise((resolve, reject) => {
        try {
          this._subscription.add(
            this.uploadService.uploadImage(file).subscribe(
              (event: any) => {
                if (event instanceof HttpResponse) {
                  if (event.body) {
                    console.log(event.body.data.fileUrl);
                    resolve({
                      default: event.body.data.fileUrl,
                    });
                  }
                }
              },
              (err: any) => {
                const errMess = err.error.error
                  ? `${err.error.error} : ${err.error.message}`
                  : "Upload không thành công. Có lỗi xảy ra";
                this.messageService.showMessage("error", "Upload", errMess);
                reject( "Upload không thành công. Có lỗi xảy ra" );
              }
            )
          );
        } catch (error) {}
      });
    });
  }

  abort() {
    this._subscription.unsubscribe();
  }

//   _initListeners(resolve: any, reject: any, file: any) {
//     const xhr = this.xhr;
//     const loader = this.loader;
//     const genericErrorText = `Couldn't upload file: ${file.name}.`;
//     xhr.addEventListener("error", () => reject(genericErrorText));
//     xhr.addEventListener("abort", () => reject());
//     xhr.addEventListener("load", () => {
//       const response = xhr.response;
//       if (!response || response.error) {
//         return reject(
//           response && response.error ? response.error.message : genericErrorText
//         );
//       }
//       resolve({
//         default: response.url,
//       });
//     });
//     if (xhr.upload) {
//       xhr.upload.addEventListener("progress", (evt: any) => {
//         if (evt.lengthComputable) {
//           loader.uploadTotal = evt.total;
//           loader.uploaded = evt.loaded;
//         }
//       });
//     }
//   }

}
