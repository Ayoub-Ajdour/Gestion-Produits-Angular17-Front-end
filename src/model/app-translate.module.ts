import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

const httpLoderFactory=(http:HttpClient)=>new TranslateHttpLoader(http,'assets/i18n/','.json');
const translateCompolerFactory=()=>new TranslateMessageFormatCompiler();
const translateLoder:Provider={
  provide:TranslateLoader,
  useFactory:httpLoderFactory,
  deps:[HttpClient]
}
const translateCompoler:Provider={
  provide:TranslateCompiler,
  useFactory:translateCompolerFactory
}
@NgModule({
  
})
export class AppTranslateModule {
  static forRoot():ModuleWithProviders<AppTranslateModule>{
    return TranslateModule.forRoot(
      {
        loader:translateLoder,
        compiler:translateCompoler
      }
    )
  }

  static forChild():ModuleWithProviders<AppTranslateModule>{
    return TranslateModule.forRoot(
      {
        loader:translateLoder,
        compiler:translateCompoler,
        isolate:false
      }
    )
  }
 }
