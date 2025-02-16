#!/bin/bash

echo "Tema 1 geri yükleniyor..."

# Tema dosyalarını kopyala
cp themes/theme1/page.tsx app/
cp themes/theme1/globals.css app/
cp themes/theme1/tailwind.config.ts ./

echo "Tema 1 başarıyla geri yüklendi!" 