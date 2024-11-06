import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  template: "<main> </main> <router-outlet>",
})
export class AppComponent {
  title = "frontend";
}
