import { useEffect } from 'react'
import RulebookContent from './RulebookContent'
import './RulebookModal.css'

interface RulebookModalProps {
  open: boolean
  onClose: () => void
}

/**
 * 순수 표시용 오버레이. 게임 상태(GameContext)를 전혀 참조하지 않으므로
 * 열고 닫아도 진행 중인 게임 데이터에는 아무 영향이 없다.
 */
export default function RulebookModal({ open, onClose }: RulebookModalProps) {
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="rb-modal-overlay" onClick={onClose}>
      <div
        className="rb-modal glass-panel glass-panel--strong"
        role="dialog"
        aria-modal="true"
        aria-label="룰북"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="rb-modal__close" onClick={onClose} aria-label="룰북 닫기">
          ✕
        </button>
        <div className="rb-modal__body">
          <RulebookContent />
        </div>
      </div>
    </div>
  )
}
