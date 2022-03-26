import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { StorageService } from "./storage.service";

export interface Theme {
  key: string;
  value: string;
}

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>("light");
  private _themes: Theme[] = [
    {
      key: "system",
      value: "system",
    },
    {
      key: "light",
      value: "light",
    },
    {
      key: "dark",
      value: "dark",
    },
  ];

  constructor(private storageService: StorageService) {
    this.init();
  }

  private async init() {
    await this.storageService.init();
    this.storageService.readTheme().then((theme: string | undefined) => {
      console.log("storage theme:", theme);
      this.sendThemeChangeMsg(theme || "system");
    });
  }

  sendThemeChangeMsg(val: string) {
    this.themeSubject.next(val);
  }

  getThemeChangeMsg(): Observable<string> {
    return this.themeSubject.asObservable();
  }

  getTheme(): string {
    // console.log("Current Theme:", this.themeSubject.getValue());
    return this.themeSubject.getValue();
  }

  public get themes(): Theme[] {
    return this._themes;
  }
}
