(use-modules (gnu packages))

(define libraries
  (packages->manifest
   (list
    (specification->package "alsa-lib")
    ;; (specification->package "at-spi2-core")
    ;; (specification->package "cairo")
    (specification->package "cups")
    ;; (specification->package "dbus")
    ;; (specification->package "expat")
    (specification->package "gcc-toolchain@11.3.0")
    (specification->package "gtk+")
    ;; (specification->package "icu4c")
    ;; (specification->package "libatomic-ops")
    ;; (specification->package "libdrm")
    (specification->package "libffi")
    (specification->package "libgccjit@11.3.0")
    ;; (specification->package "libgcrypt")
    (specification->package "libgudev")
    ;; (specification->package "libopusenc")
    ;; (specification->package "libwebp")
    ;; (specification->package "libx11")
    ;; (specification->package "libx264")
    ;; (specification->package "libxcb")
    ;; (specification->package "libxcomposite")
    ;; (specification->package "libxdamage")
    ;; (specification->package "libxfixes")
    ;; (specification->package "libxkbcommon")
    ;; (specification->package "libxml2")
    ;; (specification->package "libxrandr")
    ;; (specification->package "mesa")
    (specification->package "nss")
    ;; (specification->package "pango")
    )))

(define shell-programs
  (packages->manifest
   (list
    (specification->package "bash-minimal")
    (specification->package "coreutils")
    (specification->package "node"))))

(define browsers
  (packages->manifest
   (list
    ;; (specification->package "firefox")
    ;; (specification->package "qutebrowser")
    )))

(concatenate-manifests
 (list libraries
       shell-programs
       browsers))
