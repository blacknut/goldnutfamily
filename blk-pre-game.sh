#!/bin/bash

gamePath=$( dirname "${BASH_SOURCE[0]}" )
rm -rf /blk/apps/Blacknut-1.0.0/game
ln -s $gamePath /blk/apps/Blacknut-1.0.0/game
