import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CellularCountProject} from '../../../models/cellular-count-project';
import {ActivatedRoute, Router} from '@angular/router';
import TableFilter from 'tablefilter';
import {ExperimentService} from '../../../services/business/experiment/experiment.service';

@Component({
  selector: 'app-experiment-history',
  templateUrl: './experiment-history.component.html',
  styleUrls: ['./experiment-history.component.css']
})
export class ExperimentHistoryComponent implements OnInit, AfterViewInit {

  experiments: CellularCountProject[] = [];

  constructor(private experimentService: ExperimentService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.experiments = this.route.snapshot.data.experiments;
  }

  navigateTo(experiment: CellularCountProject) {
    this.experimentService.updateExperiment(experiment);
    this.router.navigate(['proliferation/edit']);
  }

  ngAfterViewInit(): void {
    const filtersConfig = {
      // instruct TableFilter location to import ressources from
      base_path: 'https://unpkg.com/tablefilter@latest/dist/tablefilter/',
      col_1: 'select',
      col_2: 'select',
      col_3: 'select',
      col_6: 'none',
      exclude_cols: [7],
      auto_filter: {
        delay: 0 // milliseconds
      },
      paging: {
        results_per_page: ['Records: ', [10, 25, 50, 100]]
      },
      alternate_rows: true,
      rows_counter: true,
      btn_reset: true,
      loader: true,
      mark_active_columns: true,
      highlight_keywords: true,
      no_results_message: true,
      responsive: true,
      col_types: [
        'string', 'string', 'string',
        'string', 'number', 'number'
      ],
      watermark: ['Name', '', '', '', 'Percentage', 'Temperature'],
      extensions: [
        {
          name: 'sort',
          images_path: 'https://unpkg.com/tablefilter@latest/dist/tablefilter/style/themes/'
        },
        {
          name: 'colsVisibility',
          text: 'Hide columns:',
          enable_tick_all: true,
          btn_target_id: 'colsBtn'
        }, {
          name: 'filtersVisibility',
          target_id: 'fltsBtn'
        }
      ],
      /** Bootstrap integration */

      // aligns filter at cell bottom when Bootstrap is enabled
      filters_cell_tag: 'th',

      // allows Bootstrap table styling
      themes: [{
        name: 'transparent'
      }]
    };
    const tf = new TableFilter('table-history', filtersConfig);
    tf.init();
  }

}
