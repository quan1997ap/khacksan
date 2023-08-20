import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-download-progress',
  templateUrl: './download-progress.component.html',
  styleUrls: ['./download-progress.component.scss']
})
export class DownloadProgressComponent implements OnInit {
  @Input() percentLoaded: number;
  constructor() { }

  ngOnInit(): void {
  }

}
