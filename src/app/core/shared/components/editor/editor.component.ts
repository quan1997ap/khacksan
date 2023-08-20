import { MessageService } from "./../../../services/message.service";
import { FormBuilder, FormControl } from "@angular/forms";
import { Component, OnInit, Input } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { ValidateService } from "src/app/core/services/form-validate.service";
import { UploadService } from "src/app/core/services/upload.service";
import { HttpResponse } from "@angular/common/http";
import { SystemSettingService } from "src/app/core/services/system-setting.service";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CustomUploadAdapter } from "./upload-adapter";
import {
  ImageResizeEditing,
  ImageResizeHandles,
} from "@ckeditor/ckeditor5-image";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import { EditorConfig } from "@ckeditor/ckeditor5-core";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  @Input() editorControlName: string; // label + error message
  @Input() editorControl: FormControl | any;
  acceptFileType: string;
  public Editor = ClassicEditor;
  config: EditorConfig = {
    placeholder: "Nhập nội dung ... ",
    language: "es",
    toolbar: [
      "undo", "redo",
      "|",
      // 'resizeImage:50',
			// 'resizeImage:75',
			// 'resizeImage:original',
      "|",
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
      "|",
      "heading", "bold", "italic", "blockQuote", "imageUpload",
      "|",
      "insertTable", //"tableColumn", "tableRow", "mergeTableCells",
      "|",
      "link", "numberedList", "bulletedList", "mediaEmbed",
    ],
    image: {
      resizeOptions: [
        {
          name: "imageResize:original",
          label: "Original",
          value: null,
        },
        {
          name: "imageResize:50",
          label: "50%",
          value: "50",
        },
        {
          name: "imageResize:75",
          label: "75%",
          value: "75",
        },
      ],
      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [

          'imageResize',
          'imageResize:50',
          'imageResize:75',
          'imageResize:original',
          'linkImage'
      ]
    },
  };
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    public validateService: ValidateService,
    private uploadService: UploadService,
    private systemSettingService: SystemSettingService
  ) {
    this.acceptFileType = this.systemSettingService
      .getSetting()
      ?.uploadFileTypes.join(", ");
  }

  ngOnInit(): void {}

  onReady(editor: ClassicEditor | any): void {
    console.log(editor);
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new CustomUploadAdapter(
        loader,
        this.uploadService,
        this.messageService
      );
    };
  }

  ngOnDestroy(): void {}
}
