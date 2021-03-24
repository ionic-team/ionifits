import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KeyService {
  // Generate an encryption key on the fly unique to the current app user
  // Reference: https://stackoverflow.com/a/2117523/180424
  async get(): Promise<string> {
    // generate a UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }); 
  }
}
