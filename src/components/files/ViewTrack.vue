<script setup>
import { useMmFilesStore } from '@/stores/mmFiles.store'
import { useTracksStore } from '../../modules/mus/stores/tracks.store'
import { computed, defineProps } from 'vue'
import { minsec } from '@/utiles'

// Props
const props = defineProps({
  xid: {
    type: String,
    required: true,
  },
  xtype: {
    type: String,
    required: true,
  },
})

const mmFilesStore = useMmFilesStore()
const tracksStore = useTracksStore()

const apiUrl = import.meta.env.VITE_APP_API

const mmFile = computed(() => mmFilesStore.getByX(props.xid, props.xtype))
const audio = computed(() => tracksStore.audio)

const play = () => {
  if (mmFile.value.id === audio.value.id) {
    tracksStore.setAudio({
      id: 0,
      url: '',
    })
  } else {
    tracksStore.setAudio({
      id: mmFile.value.id,
      url: mmFile.value.url,
    })
  }
}

const remove = (id) => {
  if (confirm('Подтвердите, что хотите удалить?')) {
    if (mmFile.value.id === audio.value.id) {
      tracksStore.setAudio({
        id: 0,
        url: '',
      })
    }
    mmFilesStore.remove(id)
  }
}
</script>

<template>
  <div
    v-if="mmFile"
    class="track"
    :class="{ track_active: audio.id == mmFile.id }"
  >
    <div class="flex items-center gap-4 justify-between">
      <IconPlay
        v-if="audio.id != mmFile.id"
        class="w-4 cursor-pointer"
        @click="play()"
      />
      <IconPause v-else class="w-4 cursor-pointer" @click="play()" />

      <div>
        {{ minsec(mmFile.duration) }}
      </div>
      <a class="" :href="apiUrl + 'raw/' + mmFile.url" target="_blank">
        <IconDownload class="w-4" />
      </a>
      <IconRemove class="w-4" @click="remove(mmFile.id)" />
    </div>
  </div>
</template>

<style scoped>
.track {
  @apply py-2 px-3 border;
}
.track_active {
  @apply border-2 backdrop-brightness-150;
}
</style>
