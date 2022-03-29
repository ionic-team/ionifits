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
    this.setupSystemThemeListener();

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

  private get theme(): string {
    // console.log("Current Theme:", this.themeSubject.getValue());
    return this.themeSubject.getValue();
  }

  public get themes(): Theme[] {
    return this._themes;
  }

  // Add or remove the "dark" class based on if the media query matches or user has
  // an appearance setting set.
  public toggleDarkClass() {
    document.body.classList.toggle(
      "dark",
      this.theme === "dark" || (this.theme === "system" && this.mqlDark.matches)
    );
  }

  private get mqlDark(): MediaQueryList {
    return window.matchMedia("(prefers-color-scheme: dark)");
  }

  private setupSystemThemeListener(): void {
    try {
      this.mqlDark.addEventListener("change", (evt) => {
        const systemTheme = this.themes.find((t) => t.key === "system");
        if (systemTheme) {
          systemTheme.value = evt.matches ? "dark" : "light";
        }
        this.toggleDarkClass();
      });
    } catch (mqlError) {
      console.log(mqlError);
      this.mqlDark.addListener((evt) => {
        const systemTheme = this.themes.find((t) => t.key === "system");
        if (systemTheme) {
          systemTheme.value = evt.matches ? "dark" : "light";
        }
        this.toggleDarkClass();
      });
    }
  }
}
