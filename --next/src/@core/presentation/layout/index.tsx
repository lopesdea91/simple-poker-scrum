import LayoutLoading from './_modes/Loading'
import LayoutContent from './_modes/Content'
import LayoutSetup from './setup'

export default function Layout() {
  return (
    <>
      <LayoutSetup />
      <LayoutLoading />
      <LayoutContent />
    </>
  )
}
