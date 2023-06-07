import { NgModule } from '@angular/core'
import { AppGithubIcon } from './github.icon'
import { AppNotionIcon } from './notion.icon'

const declared = [
    AppGithubIcon,
    AppNotionIcon
]

@NgModule({
    declarations: declared,
    exports: declared,
})
export class AppIconsModule {}