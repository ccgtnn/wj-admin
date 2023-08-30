import AppButton from '@/components/app/AppButton.vue'
import AppCard from '@/components/app/AppCard.vue'
import AppH1 from '@/components/app/AppH1.vue'
import AppH2 from '@/components/app/AppH2.vue'
import AppPaginator from '@/components/app/AppPaginator.vue'
import AppModal from '@/components/app/AppModal.vue'
import AppRemoveConfirm from '@/components/app/AppRemoveConfirm.vue'
import AppFilter from '@/components/app/AppFilter.vue'
import AppOrderActions from '@/components/app/AppOrderActions.vue'
import AppProgress from '@/components/app/AppProgress.vue'
import AppDropMenu from '@/components/app/AppDropMenu.vue'

import FormInput from '@/components/app/form/FormInput.vue'
import FormArea from '@/components/app/form/FormArea.vue'
import FormWarning from '@/components/app/form/FormWarning.vue'
import FormButtonSave from '@/components/app/form/FormButtonSave.vue'

import IconClose from '@/components/app/icons/IconClose.vue'
import IconCrown from '@/components/app/icons/IconCrown.vue'
import IconSpider from '@/components/app/icons/IconSpider.vue'
import IconCaretDown from '@/components/app/icons/IconCaretDown.vue'
import IconOk from '@/components/app/icons/IconOk.vue'
import IconDownload from '@/components/app/icons/IconDownload.vue'
import IconUpload from '@/components/app/icons/IconUpload.vue'
import IconPlay from '@/components/app/icons/IconPlay.vue'
import IconPause from '@/components/app/icons/IconPause.vue'
import IconRemove from '@/components/app/icons/IconRemove.vue'
import IconStar from '@/components/app/icons/IconStar.vue'
import IconEdit from '@/components/app/icons/IconEdit.vue'
import IconClock from '@/components/app/icons/IconClock.vue'
import IconArrowRight from '@/components/app/icons/IconArrowRight.vue'
import IconArrowLeft from '@/components/app/icons/IconArrowLeft.vue'
import IconArrowsRight from '@/components/app/icons/IconArrowsRight.vue'
import IconArrowsLeft from '@/components/app/icons/IconArrowsLeft.vue'
import IconArrowUp from '@/components/app/icons/IconArrowUp.vue'
import IconArrowDown from '@/components/app/icons/IconArrowDown.vue'
import IconArrowsUp from '@/components/app/icons/IconArrowsUp.vue'
import IconArrowsDown from '@/components/app/icons/IconArrowsDown.vue'

export default function (app) {
  app.component('IconClose', IconClose)
  app.component('IconCrown', IconCrown)
  app.component('IconSpider', IconSpider)
  app.component('IconCaretDown', IconCaretDown)
  app.component('IconOk', IconOk)
  app.component('IconDownload', IconDownload)
  app.component('IconUpload', IconUpload)
  app.component('IconPlay', IconPlay)
  app.component('IconPause', IconPause)
  app.component('IconRemove', IconRemove)
  app.component('IconStar', IconStar)
  app.component('IconEdit', IconEdit)
  app.component('IconClock', IconClock)
  app.component('IconArrowRight', IconArrowRight)
  app.component('IconArrowLeft', IconArrowLeft)
  app.component('IconArrowsRight', IconArrowsRight)
  app.component('IconArrowsLeft', IconArrowsLeft)

  app.component('IconArrowUp', IconArrowUp)
  app.component('IconArrowDown', IconArrowDown)
  app.component('IconArrowsUp', IconArrowsUp)
  app.component('IconArrowsDown', IconArrowsDown)

  app.component('AppButton', AppButton)
  app.component('AppCard', AppCard)
  app.component('AppH1', AppH1)
  app.component('AppH2', AppH2)
  app.component('AppProgress', AppProgress)
  app.component('AppPaginator', AppPaginator)
  app.component('AppModal', AppModal)
  app.component('AppRemoveConfirm', AppRemoveConfirm)
  app.component('AppFilter', AppFilter)
  app.component('AppOrderActions', AppOrderActions)
  app.component('AppDropMenu', AppDropMenu)

  app.component('FormInput', FormInput)
  app.component('FormArea', FormArea)
  app.component('FormWarning', FormWarning)
  app.component('FormButtonSave', FormButtonSave)
}
