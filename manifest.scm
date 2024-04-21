(use-modules (gnu packages))

(define libraries
  (specifications->manifest
   '(
     "alsa-lib"
     ;; "at-spi2-core"
     ;; "cairo"
     "cups"
     ;; "dbus"
     ;; "expat"
     "gcc-toolchain@11.3.0"
     "gtk+@3"
     ;; "icu4c"
     ;; "libatomic-ops"
     ;; "libdrm"
     ;; "libffi"
     "libgccjit@11.3.0"
     ;; "libgcrypt"
     "libgudev"
     ;; "libopusenc"
     ;; "libwebp"
     ;; "libx11"
     ;; "libx264"
     ;; "libxcb"
     ;; "libxcomposite"
     ;; "libxdamage"
     ;; "libxfixes"
     ;; "libxkbcommon"
     ;; "libxml2"
     ;; "libxrandr"
     ;; "mesa"
     "nss"
     ;; "pango"
     )))

(define shell-programs
  (specifications->manifest
   '("bash-minimal"
     "coreutils"
     "node")))

(define browsers
  (specifications->manifest
   '(
     ;; "firefox"
     ;; "qutebrowser"
     )))

(concatenate-manifests
 (list libraries
       shell-programs
       browsers))
