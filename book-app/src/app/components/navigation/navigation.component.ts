import { Component, OnInit } from '@angular/core';
import {ContextService} from '../../services/context/context.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.less']
})
export class NavigationComponent implements OnInit {

  constructor(public context: ContextService) { }

  ngOnInit() {
  }

}
