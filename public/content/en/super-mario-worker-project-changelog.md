---
title: Super Mario Worker Project
---

### Changelog
#### v1.7.12-beta4 (2025-09-23)
##### Editor
- When setting a new group of weather parameters in Scene Controllers after testing a level with `F3` / `F4`, the previous values will now be remembered.
- After loading a level, the Scene Controler's stored weather parameters will be cleared; when selecting "Reset weather" in the Scene Controller submenu, the object's current weather parameters can now be reloaded.
##### Bug Fixes
- Fixed an issue where passage exits could not be moved by 16 pixels using the R/F/D/G keys.
- Fixed a bug where the Luminate toggle for certain objects did not work.
- Fixed an issue where Weather Settings in Scene Controller, which linked to View Controller or Bowser, were ineffective.
- Fixed a bug where enemies could still be placed in the music/background/weather setting screens.
- Fixed a text alignment issue in the Custom Music settings.

#### v1.7.12-beta3 (2025-08-02)
##### Bug Fixes
- Fixed an issue where, on some computers, spotlight in levels with illumination could appear misaligned or distorted.
##### Known Issues
- Since v1.7.12 replaced `keyboard_check` with `keyboard_check_direct` in gameplay code, the game may still detect keyboard input while the window is unfocused.

#### v1.7.12-beta2 (2025-07-26)
##### Editor
- Luminate settings are now displayed automatically, without the need to click the middle mouse button.
##### Bug Fixes
- Fixed an issue where, after placing several Scene Controllers, new ones could no longer be placed.
- Fixed a bug where the Thwomp would only trigger one of two bricks when hitting both simultaneously.
- Fixed an issue where the luminate effect setting in Scene Controllers had no effect.
- Fixed a bug where Weather Settings in Scene Controllers were reset after saving and reloading the level.
- Fixed an issue where pressing the Sub Menu key would still play a sound even when not placing blocks.
- Fixed a bug where selecting No when asked whether to apply Weather Settings in Scene Controllers had no effect.
- Fixed an issue where it was possible to press `Ctrl+S` to save while editing parameters for roto-discs, Yellow Paratroopas, Blue Paratroopas, Cheep Cheep Areas, View Controllers, or Fluid Controllers.
- Adjusted the spotlight position for Super Mario and in Camera Mode.
- Fixed an issue in God Mode where pressing the Up key before entering Camera Mode caused the view to shift upward by 8 pixels.

#### v1.7.12-beta1 (2025-07-20)
##### Editor
- The WORLD line in the level name can now be customized.
- Updated the Enemy Selector graphics.
- In Camera Mode, Mario's coordinates are now displayed.
- When placing Blocks, user can press the Sub Menu key to toggle whether a solid is placed simultaneously.
- Adjusted the cursor transparency while placing Imitators.
- Increased the transparency of hidden ?-blocks in the editor for better distinction.
- The editor now supports `Ctrl+S` for quick saving.
- Added a restriction preventing Blue Paratroopas from being placed on the topmost row of a level, to avoid cases where their jump height cannot be set, which could block other operations.
##### Level Features
- Weather System: supports Rain, Meteor Showers, Snow, Lightning, and Wind, along with a darkness overlay and a corresponding luminate system. Objects that support lumination can be individually configured by right-clicking them in the selectors. Scene Controllers can also control weather.
- Added new enemies: 4-direction Piranha Heads and 4-direction Spikes.
- When playing a single level, the number of lives can now be customized in the options.
- It is now possible to press multiple keys simultaneously at the very start of a level (note: aerial jump is disabled on frame 1).
- Added new Additional Settings:
    - HUD Display
    - Faster Level Pass
    - Thwomp Activate Blocks
- The Restart Level key can now be customly assigned.
##### Other
- Updated INNOVATION LEAP Logo animation.

#### v1.7.11 (2025-07-18)
##### Editor
- Added Custom Music support. Users can now create their own music packs for their works. Music packs can be placed either in SMWP's custom music folder (`Data\Custom`) or in the same directory as the `.smws` / `.smwp` files.
- When creating a `.smwp` file, the editor will now ask whether to create a corresponding `.smws` file as well.
- Switch Blocks, bonus items, scenery, and enemies can now be dragged to place.
- When "Invisible Solid (`F5`)" is enabled, selecting any solid object will automatically disable that mode.
- Solid/transparent Color Blocks can now be toggled by pressing the middle mouse button.
##### Level Features
- Added new enemies: Blue Piranha Plant, Stone Piranha Plant, and Evil Lakitu.
- Added new blocks: Solid Color Blocks (not to be confused with Switch Blocks) and Solid Color Pipes.
- Added new backgrounds: Mysterious Forest, Relaxing Beach, and Sunset Gradient.
- Pressing `F1` in a level now displays level information at the bottom-left corner of the screen. The title bar also shows the level author and the level's SMWP version.
##### Bug Fixes
- Added an experimental font cache cleanup for the FoxWriting plugin.
- Fixed a bug where the goal's actual score didn't match the displayed score icon.
- Fixed a bug where Cheep Cheep corpses were shifted 16 pixels left.
- Fixed a bug that cause multiple coins, bonuses or scenary to be placed at the same position.
- Fixed a bug where moving shells could cause 1UP score cycling by hitting Spiny Eggs.
- Fixed an inconsistency between the white pipe tileset and the Solid White Pipe.
##### Other
- Added version number to the window title.
- Removed the update checker. The game now directly shows the INNOVATION LEAP Logo and enters the title screen upon launch.

#### v1.7.10 (2024-10-12)
##### Editor
- Additional Settings: Add MF Style Pipe Exit option. When enabled, Mario will no longer have invincibility frames upon exiting a passage. Disabled by default.
- Adjusted default states for several Additional Settings: Advanced Switch is now disabled by default, and Celeste Style Switch is enabled by default.
- When testing a level with `F3` / `F4`, the editor now automatically returns to the camera position before testing once the test ends.
##### Level Features
- Fixed performance issues in large levels caused by having too many passages.
- Reduced lag caused by a large number of Color Blocks while Celeste Style Switch is enabled.
- Reduced lag in large levels with many active entities (e.g., Goombas, Spinies, Koopas, Mushrooms, etc.).
- Removed the old "Smooth Mode" toggle that used to be activated with `F11` during gameplay. It is now replaced with a new toggle: pressing `F11` switches Enemy Optimization on or off.
    - Enemy Optimization refers to the new performance improvements in v1.7.10 that mitigate lag when too many enemies are present. It significantly improves performance in large levels.
    - However, this optimization may slightly alter enemy behavior when overlapping with solids. If a level relies on such interactions, disable Enemy Optimization for accurate behavior.
    - v1.7.10 and later have Enemy Optimization enabled by default, while levels from earlier versions have it disabled.
    - Hold `F1` during gameplay to check whether Enemy Optimization is currently enabled.
##### Bug Fixes
- Fixed a bug where the special background music "SMG BEACHBOWL GALAXY" would behave erratically after a **Fast Retry** or upon level completion.
- Fixed a minor issue: when exiting a horizontal passage, Mario's position was offset 16 pixels too far to the right.
    - Levels created before v1.7.10 are unaffected.
    - However, if an old level is saved in v1.7.10 or later, this fix will automatically apply, which may affect levels that previously included manual adjustments for this offset.

#### v1.7.9 (2022-07-24)
##### Editor
- Added a large number of music tracks, including 13 original compositions for SMWP by 1168438795 and Bluesun.
- Added the option to select "No Music" in the music selection screen.
##### Level Features
- Expanded the autoscroll speed range to `0–60` (note: at extremely high speeds, Mario may suddenly die when the scrolling stops).
- Scene Controller can now be linked to Bowser, allowing Bowser's music to be changed.
- Optimized Imitator-related code to improve performance in levels containing a large number of Imitators.
##### Bug Fixes
- Fixed two shell-related bugs:
    - Stationary Buzzy Beetle shells that haven't been kicked could be killed by another shell.
    - Stationary shells originating from Koopas would not fall after the Colored Block turning from solid to transparent.

#### v1.7.8 (2021-07-11)
##### Editor
- Added a feature: when placing Imitators, the mouse cursor becomes a hammer, all Imitators become fully opaque, and Blocks' opacity changes to 0.4. When placing blocks, the effect is reversed.
##### Bug Fixes
- Fixed a crash bug in v1.7.7 that occurred when attempting to place Blocks outside the screen area.
- Fixed an issue where Imitators were displayed on top of Blocks in the editor.
- Fixed a bug in v1.7.7 where switching from Block mode to Imitator mode prevents Accurate Move.
- Fixed a bug where Auto Fluid did not work when the initial water level was equal to the Auto Fluid's first target height (T1).
##### Other
- Added an update check feature and restored the loading screen. (Update checker can be disabled in the settings.)

#### v1.7.7 (2021-05-03)
##### Editor
- Added the ability to move objects by 16 pixels at once. Hold the Accurate Move key (default: Z), then use R, F, D, and G (corresponding to Up, Down, Left, and Right) to move the object by 16 pixels at a time.
- Allowed editing of objects with negative coordinates directly by stretching the window and clicking the black border area.
- Added support for switching between Block and Imitator.
##### Level Features
- Players can now toggle the Switch Block sound effect on or off (press `F2` during gameplay). The setting resets to sound on each time a new level is entered or reopened.
- Added Accessibility Mode (Color). When enabled, Switch Blocks in both gameplay and editor will display letters to help distinguish different colors. This mode is determined by the player, not by the level author.
##### Bug Fixes
- Fixed a discrepancy between MW-style Beetroot movement and the MW 1.1 version (specifically regarding the ability to pass through one-tile-wide vertical gaps).
- Fixed an issue where the editor mistakenly treated pre-1.7 levels (collectively called "legacy levels") as MF-style Beetroot levels.
- Fixed an issue where, in a scenario, if an earlier level used MF-style Beetroot, later legacy levels would also be incorrectly set to MF-style Beetroot.
- Fixed an issue where legacy levels inherited the Fast Retry setting when included in scenarios.
- Fixed a bug introduced after v1.7.3 where vertically moving platforms (cloud or castle types) would abruptly disappear or reappear at screen edges.
- Fixed an issue where the tail end of "Area Objects" (Cheep Cheep Areas, View Controller, Fluid Controller Areas) could not be Accurate Moved. The head end can now be Accurate Moved to change position, and the tail end to adjust size.
- Fixed an issue where pressing `F8` to play BGM or deleting autoscroll nodes caused Autoscroll Objects to have incorrect numbering.
- Fixed a memory residue issue with Blocks after resizing level using `F7`.
- Fixed expired links on the title screen.
- Fixed abnormal edge collision behavior for moving cloud platforms.
- Fixed pitch distortion issues with `ktkm38.dll` BGM playback.
- Fixed overly dark appearance of Dark Clouds in the editor.
- Fixed a bug where a Roto-disc located at coordinates (0, 0) would disappear.
##### Other
- Updated INNOVATION LEAP logo.

#### v1.7.6 (2020-07-27)
##### Editor
- Users are now prevented from setting the fluid altitude parameter larger than `1,000,000`.
##### Level Features
- Added Celeste Style Switch to the information displayed when holding `F1` during gameplay.
- Significantly optimized scenery objects (such as Imitators) in both editor and gameplay, greatly improving performance in levels with large numbers of such objects.
##### Bug Fixes
- Fixed a bug where Ice Blocks occasionally failed to break.
- Fixed a bug where loading any level in the editor would forcibly enable MF-style Beetroot.
- Removed a mysterious black dot that appeared on Stone Spiny in the editor.
- Fixed a gap flaw in rising and falling water.
- Fixed an issue where the Delay setting of Auto Fluid did not correspond to the actual level timer.
- Fixed a bug where Fluid Controller Area failed to move when the level was shifted using `F7`.
- Fixed a bug where, after using `F7`, the instant fluid target altitude in Scene Controllers was reset to zero.
- Fixed a bug where View Controller containing negative coordinates would cause errors.
- Fixed an inconsistency where night trees had different horizontal offsets compared to other trees.

#### v1.7.5 (2020-07-11)
##### Editor
- Refactored Accurate Move, greatly improving editor smoothness; enhanced responsiveness and fluidity during Accurate Move; Reduced the delay between holding a direction key and the start of continuous object movement.
##### Bug Fixes
- Fixed an issue where the `E` key in the editor occasionally failed to respond.
- Fixed a bug where parameters of Fluid Controller and Auto Fluid did not update when the level was shifted using `F7`.
- Fixed a frame rate drop that occurred when hovering the mouse over scenery objects.
- Fixed an issue where object coordinates were partially hidden in the lower-right corner display when the coordinates were too large.
##### Known Issues
- The program may crash when minimized.

#### v1.7.4 (2020-06-26)
##### Level Features
- Additional Settings: MF style beetroot option is enabled by default.
- For periodically rising and falling fluids, when the parameter `delay > 0`, the fluid will now wait for that duration after each rise/fall as well, not just at the start, before reversing its direction.
- Additional Settings: Added Celeste Style Switch option (disabled by default). When enabled, if Mario overlaps with a transparent block that becomes solid, the block beneath Mario will temporarily remain transparent until Mario leaves, after which it returns to its proper state.
##### Bug Fixes
- Fixed an issue where Mario touching a Fluid Controller Area would not cancel Auto Fluid.
- Fixed a bug where Scene Controller in linked mode didn't work when Mario was at the start position.
- Fixed a bug where Mario could be burned by global lava fluid higher than the starting position upon respawning from a Check Point.
- Fixed an issue where, if Mario teleported to a Check Point in God Mode or reached it without using a passage, and then revive after suicide, the BGM and other elements would not be affected by the scene control markers (linkage status).
- Fixed an issue where View Controller and Flying Cheep Cheep Area would shift incorrectly when the level was shifted using `F7`.
- Improved the animation of Spiny.
- Fixed an issue where the bottom-right corner of the View Controller or Flying Cheep Cheep Area did not move properly when using Accurate Move.

#### v1.7.3 (2020-06-13)
##### Level Features
- Switch Blocks and Fluid Controller Blocks can now crush enemies from below.
- When Mario is caught in a Colored Block turning from transparent to solid, he will become stuck and immobile. When the block turns back from solid to transparent, Mario regains his previous horizontal and vertical velocities.
##### Bug Fixes
- Fixed a bug where, after manually canceled Auto Fluid in game, it would not return upon respawning.
- Fixed a bug where hiding the fluid with Blue Switch Block during water movement caused the fluid altitude to behave incorrectly.
- Fixed an issue where hitting multiple Switch Blocks simultaneously only triggered one response.
- Fixed some tile errors on the first page of the Blocks Selector.
- Adjusted the vertical moving platform loop mode: it now moves to the opposite side after exceeding the level boundary by 16 pixels, for both upwards and downwards (levels from versions ≤1.7 are unaffected).
- Fixed a bug where Cyan Switch Block caused vertical moving platforms to misalign.

#### v1.7.2 (2020-06-03)
##### Editor
- Some functions in the editor can now be assigned to custom hotkeys.
- Ice blocks are now semi-transparent in the editor.
- Pressing `F5` in the editor now toggles solids' visibility.
- Temporary files are now named using the format "LevelName + Timestamp" for easier lookup.
##### Level Features
- Added an option for MF-style beetroot behavior.
- Added standalone shells (10 types, switchable with the mouse wheel, ID: 043). A standalone shell triggers when it enters the screen, initially facing Mario.
- Added bump animations and cooldowns for Message Blocks, Switch Blocks, and Fluid Controller Blocks.
- Water level control (via Fluid Controllers or Scene Controllers) can now be used even Auto Fluid is enabled in Additional Settings, though doing so cancels Auto Fluid; it will be restored after respawning at a Check Point.
- When Fast Retry is enabled, background music volume now decreases when the death sound effect plays.
- When the player stands on an Ice Block underwater, Mario cannot move sideways and his velocity resets to 0; can only escape by swimming.
- The global lava fluid hitbox has been lowered by 2 pixels, matching normal lava. Mario will no longer die if standing on a solid level with the lava surface.
- Added a brown castle style moving platform.
- In-game, holding `F1` now displays certain parameters from Additional Settings in the title bar.
- In-game, pressing `Enter` can now manually close message text.
##### Bug Fixes
- Fixed an error occuring when repeatedly hitting objects with the MF beetroot.
- Fixed an issue where triggering Bowser once would cause all levels to remain in a Bowser-triggered state.
- Fixed erratic behavior when previewing Scene Controller.
- Fixed the lava swimming issue.
- Fixed a bug where hitting a Yellow Switch Block could cause a ?-block to turn into a coin.
- Fixed a bug where Ice Block sliding effects did not return to normal after stepping on a ?-block.
- Fixed erratic behavior of Ice Blocks underwater.
- Fixed an issue in God Mode where switching Check Points with `PgUp` / `PgDn` did not change the scene set by Scene Controller.
- Fixed missing black single-tile brick in the Blocks selector.
- Fixed a scene detection bug when entering a scene from a passage located just outside the screen while the scene was locked by View Controller.
- Fixed an issue where temporary file names might display incorrectly.
- Updated Koopa textures.
- Fixed missing background music when Bowser's auto-scrolling was triggered.
- Fixed an issue where camera moved when using Accurate Move with arrow keys in the editor.

#### v1.7.0 (2020-05-24)
##### Editor
- Added Pick and Parameterized Object Movement features to the `E` key.
- Added the ability to stop auto-scrolling in God Mode by pressing `0`.
- Reorganized the Blocks tab and added Graveyard, Red-Yellow Mushroom Platform, and Blue-White Mushroom Platform.
- Refactored the code related to object overlapping and deletion behavior.
- Removed the `F5` function.
- Solids and sealer solids can now delete each other when selected.
- Upgraded Scene Controller functionality: background music (BGM) and background (BGP) set by the controller can now be previewed in the editor.
- Changed the Accurate Move key from `Ctrl` to `Z`, and the Submenu key from `Shift` to `Q`.
- Additional Settings: Added fluid-related options.
- Additional Settings: Added Fast Retry option for quick restart after death (without resetting BGM).
- Additional Settings: Added Advanced Switch option to enable/disable the secondary function of switch blocks.
##### Level Features
- Added Message Block (ID: 226).
- Added Switch Blocks (IDs: 227-229).
- Added Ice Block (ID: 230).
- Added Special Solids (3 types, ID: 231, parameter range 0–2).
- Added Fluid Controller (ID: 232).
- Added Scene Controller (ID: 233).
- Added View Controller (ID: 234).
- Added Imitator (ID: 342).
- Introduced a global lava system, which shares the same framework as water, together referred to as the fluid system.
- Starting from v1.7, Beetroot can now break bricks.
- Starman Mario and Buzzy Beetle shells can now defeat Blue and Spiky Cheep Cheeps.
##### Bug Fixes
- Fixed a texture size issue with dotted pipes.
- Adjusted fireball spawn positions for Mario and Fire Bro., moving them 8 pixels downward to prevent explosions when Mario's head touches the ceiling.
- Fixed a memory residue issue in Autoscroll Object, which could cause new levels to start with a nonzero scroll sequence.
- Fixed erratic behavior when pressing `F6` in the editor.
- Fixed an issue where stomping enemies could sometimes result in invulnerability.

#### v1.6.5 (2019-07-15)
##### Editor
- Improved the item deletion feature in the editor: pressing the `Delete` key now enables Super Delete Mode, allowing right-click to remove any object. (2019-07-14)
##### Bug Fixes
- Fixed a one-pixel left offset issue with Check Points when saving levels. (2019-07-09)
- Fixed performance issues when too many moving platforms were present in a level. (2019-07-12)
- Fixed a freeze that occurred when Mario and Bowser were defeated simultaneously. (2019-07-12)

#### v1.6.3 (2019-06-20)
##### Bug Fixes
- Fixed multiple issues caused by the Bill Blasters offset adjustment introduced in v1.6.2. (2019-06-20)

#### v1.6.2 (2019-05-12)
##### In Game
- Updated the tiles for light purple platforms to be 16 pixels tall. (2019-04-02)
- Slightly adjusted Buzzy Beetle shells collision detection to prevent wall clipping when close to solid blocks. (2019-04-30)
- Updated textures for reversed Bill Blasters. (2019-04-30)
##### Bug Fixes
- Fixed incorrect color on gray platforms. (2019-04-02)
- Modified offset for Green Paratroopas. (2019-04-30)
- Fixed a one-pixel offset issue in Bill Blasters positions during gameplay. (2019-04-30)
- Fixed an issue where the Roto-Disc Layer setting could fail to load properly if set to "Below", in both the editor and the game. (2019-05-12)

#### v1.6.1 (2019-03-24)
##### Bug Fixes
- Fixed an issue with vertical moving platforms. (2019-03-09)
- Fixed inaccuracies in physics (which differs from previous versions) when gravity was set to a very low value. (2019-03-09)
- Fixed an issue where non-grid-aligned solids could be clipped through. (2019-03-09)

#### v1.6.0 (2019-02-19)
##### Highlights
- Introduced a custom file compression extension to fix occasional startup errors. (2018-10-05)
- Added Autoscroll Object (ID: 223). (2019-02-12)
- Added Platform Border Marker (ID: 224). (2019-02-12)
- Added Universal Platforms (ID: 225). (2019-02-12)
- Added an option "Object Offset Correct," defaulting to "No." When enabled, the editor displays objects exactly as they appear in-game. (2019-02-13)
- Additional Settings: Added Water Layer Order and Roto-Disc Layer settings. (2019-02-14)
- Added new enemies: Cheep Cheep Area (ID: 040) and Flying Cheep Cheep Area (ID: 041). (2019-02-14)
- Added stationary Roto-Disc. (2019-02-16)
##### Editor
- Added auto-scrolling object (ID: 223). (2019-02-12)
- Added Platform Border Marker (ID: 224). (2019-02-12)
- Added Universal Platforms (ID: 225). (2019-02-12)
- Heavily revised the Marks Selector. (2019-02-12)
- Passage exits can now be accurate moved. (2019-02-14)
- Added three new backgrounds. (2019-02-14)
- Additional Settings: Added Water Layer Order and Roto-Disc Layer settings. (2019-02-14)
- Added new scenery: Overcast Cloud (ID: 137), Roto-Disc Core (ID: 138, displayed above blocks), Coral Background (Deep/Mid/Shallow, IDs: 139–141). (2019-02-14)
- Added a Water Level setting to Additional Settings. (2019-02-16)
##### In Game
- Added new enemies: Cheep Cheep Area (ID: 040) and Flying Cheep Cheep Area (ID: 041). (2019-02-14)
- Added stationary Roto-Disc. (2019-02-16)
- In God Mode, enabling Smooth Mode will now display "GOD(SMOOTH)." (2019-02-16)
##### Bug Fixes
- Fixed an issue where encrypted level files could become corrupted if the game crashed unexpectedly. (2018-09-22)
- Introduced a custom file compression extension to fix occasional startup errors. (2018-10-05)
- Fixed a pagination issue in the Scenery and Enemy Selectors. (2019-02-12)
- Fixed an issue where shells could cause 1UP score cycling when hitting Bowser. (2019-02-13)
- Fixed an issue where Blue Flying Cheep Cheeps could be defeated by fireballs or beetroots. (2019-02-14)
- Fixed an issue where overlapping the starting position and Green Mushroom would incorrectly grant an extra life upon respawning at a Check Point. (2019-02-16)
- Fixed an issue where Roto-Disc paths and numbers appeared red under certain conditions. (2019-02-17)
- Fixed an issue where new objects failed to display in scenarios. (2019-02-19)
- Fixed an issue where scenarios could only use default key bindings. (2019-02-19)
- Fixed random lockups and layer reading errors when loading scenarios (e.g., 20×15 grid freeze). (2019-02-19)
##### Other
- Added an Options page to the title screen, allowing adjustment of the maximum number of temporary files. (2019-02-13)
- Added an option "Object Offset Correct," defaulting to "No." When enabled, the editor displays objects exactly as they appear in-game. (2019-02-13)
- Added configurable key bindings. (2019-02-13)
- Added staff credits. (2019-02-14)
- Added Smooth Mode toggle to Options. (2019-02-16)

#### v1.5.2 (2018-09-02)
##### Editor
- Added the ability to adjust the jump height of Jumping Paratroopas, with a maximum value of 999. (2018-08-27)
##### Game
- Further adjusted the firing range of Bill Blasters. (2018-08-26)
- Adjusted the movement of Jumping Paratroopas. (2018-08-29)
- Adjusted the lava graphics. (2018-09-02)
##### Bug Fixes
- Fixed an issue with pressing `Shift` at the center of a Yellow Paratroopas object. (2018-08-20)
- Fixed incorrect block IDs for inverted purple pipes and right-facing green pipes in the editor. (2018-08-26)
- Fixed an issue where Mario could not enter passages in infinite-time levels. (2018-08-26)
- Fixed an issue in Camera Mode where Mario would fall vertically without control or be carried away by moving platforms. (2018-08-26)
- Fixed an issue where fireballs could pass upward through solids. (2018-08-27)
- Fixed several wall-clipping issues while Modified Movement is enabled. (2018-08-27)
- Fixed an issue where fireballs could not defeat Bowser. (2018-08-29)
- Fixed an issue where Jumping Paratroopas could not have their height adjusted after being placed. (2018-08-29)
- Fixed an issue where Yellow Paratroopas read incorrect parameters when their attributes were modified. (2018-08-29)
##### Other
- Replaced SXMS with MaizeMusic. (2018-08-27)

#### v1.5.0 (2018-08-19)
##### Highlights
- Added new block tiles. (2018-08-03)
- Added new enemies: Mario Forever-style Spike, Yellow Koopa, and Yellow Paratroopa. (2018-08-03)
- Redesigned the Prefs tab and added an Additional Settings section to toggle optional features. (2018-08-06)
- Added an optional setting Modified Movement; when enabled, the level code includes the line `modifiedmov=1` for recognition. (2018-08-06)
- Setting the level time to a negative value now grants unlimited time while still allowing level completion. (2018-08-06)
- Added new backgrounds: Temple, Snowfield, Lava Castle, and Goomba Party. (2018-08-10)
- Fixed an issue with large scenario files failing to load properly. (2018-08-12)
- Added new scenery: desert-themed decorations, lava waterfall, and new railings. (2018-08-16)
##### Editor
- Added animation preview for Roto-Disc in the editor. (2018-08-03)
- Added new block tiles. (2018-08-03)
- Redesigned the Prefs tab and added an Additional Settings section to toggle optional features. (2018-08-06)
- Added an optional setting Modified Movement; when enabled, the level code includes the line `modifiedmov=1` for recognition. (2018-08-06)
- Completed missing block types such as dotted pipes. (2018-08-08)
- Unified block brick graphics to use square corners. (2018-08-08)
- Added new backgrounds: Temple, Snowfield, Lava Castle, and Goomba Party. (2018-08-10)
- Added Background #10 and #14 to the background selection screen. (2018-08-10)
- Added a label for Block No. 85 in the editor. (2018-08-15)
##### In Game
- Added new enemies: Mario Forever-style Spike, Yellow Koopa, and Yellow Paratroopa. (2018-08-03)
- Setting the level time to a negative value now grants unlimited time while still allowing level completion. (2018-08-06)
- Implemented infinite height for sealer solids. (2018-08-10)
- Improved fireball landing detection to reduce false explosions. (2018-08-12)
- Increased line limit for `.smwp` encrypted files. (2018-08-15)
- Adjusted the jump height of Jumping Paratroopas. (2018-08-15)
- Added new scenery: desert-themed decorations, lava waterfall, and new railings. (2018-08-16)
##### Bug Fixes
- Fixed an issue where pressing `Q` in God Mode would not cause self-destruct. (2018-08-06)
- Fixed an issue with auto-pairing of dotted pipes. (2018-08-08)
- Fixed wall-clipping issues. (2018-08-10)
- Fixed a bug where overlapping Yellow Paratroopas and Roto-Discs could cause save errors. (2018-08-12)
- Fixed an issue with large scenario files failing to load properly. (2018-08-12)
- Fixed stretched mushroom sprites. (2018-08-12)
- Fixed pause animations for Red and Yellow Paratroopas. (2018-08-15)
- Fixed an issue where Lui Mario could not clip upward while Modified Movement is disabled. (2018-08-15)
- Fixed an issue where Modified Movement setting might not display properly. (2018-08-15)
- Fixed several issues related to music playback. (2018-08-15)
- Fixed several minor issues in the editor. (2018-08-15)
- Fixed a bug where Roto-Disc fractional speeds could not be saved. (2018-08-16)
- Fixed an issue where crouching jumps clips in Modified Movement mode. (2018-08-16)
- Fixed the Help button redirection error on the title screen. (2018-08-16)
- Fixed possible `real` function errors when loading scenarios. (2018-08-16)
- Fixed clipping at sealer solids. (2018-08-18)
- Fixed an issue with Bill Blasters firing range. (2018-08-18)
- Fixed an issue where Yellow Paratroopas ignored time-stop effects when passing a level. (2018-08-18)
##### Other
- Added a new music pack Super Mario Series and updated the music selection screen. (2018-08-15)

#### v1.4.5 (2018-07-13)
##### In Game
- Rewrote enemy collision detection. (2018-07-07)
##### Bug Fixes
- Fixed an issue where moving shells could be destroyed by Bullet Bills. (2018-07-07)

#### v1.4.4 (2018-07-03)
##### In Game
- Adjusted Bullet Bill hitboxes. (2018-06-23)
- Adjusted the rendering layer of beetroots in the game. (2018-06-23)
- Rewrote the fireball code: fireballs no longer upwards pass through solids and now explode upon hitting a solid block above; also updated fireball animations. (2018-06-28)
- Unified the fireball speed between Fire Bro. and Fire Mario. (2018-06-28)
##### Bug Fixes
- Fixed an issue where pipe pairing did not display correctly. (2018-06-13)
- Fixed an issue where scrollbars could still appear in the Select Background / Select Music screens. (2018-06-13)
- Fixed an issue where Bullet Bills were invincible when hit by fireballs or beetroots. (2018-06-23)

#### v1.4.1 (2018-03-18)
##### In Game
- Rewrote the `.smws` file loading mechanism and modified the encryption method for `.smwp` files. (This version is NOT compatible with `.smwp` files from v1.4.0, vice versa.) (2018-03-18)
- Added an experimental feature: Smooth Mode for gameplay. Press `F11` during gameplay to toggle. (2018-03-18)
##### Other
- Added a temporary folder for automatic file backups. Each time a level is saved, including instant test saves triggered by `F3` / `F4`, a backup file named `temp_xxx.smwl` is automatically created in this folder. (2018-03-18)

#### v1.4.0 (2018-02-28)
##### Highlights
- Added new enemies: Buzzy Beetle, Boo, Red Paratroopa, Blue Koopa, Blue Paratroopa, and Electro Coral. (2018-01-23)
- Unlocked snowfield and desert backgrounds. (2018-01-25)
- Unlocked new blocks including daytime snow grass. (2018-01-25)
- Buzzy Beetle shells can now break bricks. (2018-01-25)
- Increased the maximum level size to 1920×1920. (2018-01-29)
- Creating a new level no longer adds extra 10 pixels: for example, a 20×15 grid now correctly produces a 640×480 level. (2018-01-29)
- Significantly improved editor performance. Experimental smooth mode is off by default; press `F11` in the editor to toggle it. (2018-02-01)
- Fixed stuck-in-solid issues of Hammer Bro. and Fire Bro., improving upon Mario Worker 1.1 to eliminate the "stuck-then-break-free" motion. (2018-02-13)
- Added level encryption feature; protected files use the `.smwp` format. (2018-02-22)
- Added All supported formats option to the level selection dialog. (2018-02-22)
- Changed `F7` to resize the current level without clearing its contents (this feature may be unstable). The Create New Level function has been moved to `F5`, with revised warning text. (2018-02-22)
##### Editor
- Added new enemies: Buzzy Beetle, Boo, Red Paratroopa, Blue Koopa, Blue Paratroopa, and Electro Coral. (2018-01-23)
- Unlocked snowfield and desert backgrounds. (2018-01-25)
- Unlocked new blocks including daytime snow grass. (2018-01-25)
- Increased the maximum level size to 1920×1920. (2018-01-29)
- Creating a new level no longer adds extra 10 pixels: for example, a 20×15 grid now correctly produces a 640×480 level. (2018-01-29)
- Reorganized background selections, added large cloud backgrounds and castle backgrounds without parallex, and a revised snowfield background. (2018-01-29)
- Adjusted Bowser portrait size to 128×160; in the editor, it now follows the mouse at the top left. (2018-02-01)
- Significantly improved editor performance. Experimental smooth mode is off by default; press `F11` in the editor to toggle it. (2018-02-01)
- Added scrollbars in the editor, appearing when the mouse briefly stays near the bottom or right edges of the screen. (2018-02-01)
- `F10` in the editor now supports manually setting water level. (2018-02-01)
- Added six new snowfield scenery objects. (2018-02-01)
- Updated textures for `s_edbonuses` and `s_edmarkers`, and revised several translations. (2018-02-02)
- Modified the exit prompt after pressing `F3` or `F4` followed by `Esc` in the editor. (2018-02-11)
- Added level encryption feature; protected files use the `.smwp` format. (2018-02-22)
- Changed `F7` to resize the current level without clearing its contents (this feature may be unstable). The Create New Level function has been moved to `F5`, with revised warning text. (2018-02-22)
##### In Game
- Slightly adjusted Boo's swing frequency. (2018-01-25)
- Increased the movement speed of Blue Koopa. (2018-01-25)
- Buzzy Beetle shells can now break bricks. (2018-01-25)
- Attempted to fix the stomp detection issue. (2018-01-25)
- Fixed issues with Starman Mario and shells cause 1UP score cycling on some enemies. (2018-01-25)
- Electro Coral now renders above other layers. (2018-01-25)
- Raised water surface layer above the block layer. (2018-01-29)
- Increased Fire Bro.'s attack frequency. (2018-01-29)
- Enlarged Bowser's portrait. (2018-01-29)
- Super Stars now always move right. (2018-02-01)
- Adjusted desert and snowfield backgrounds. (2018-02-01)
- Hammer Bro. and Fire Bro. will no longer throw hammers or fireballs when they are vertically off-screen. (2018-02-01)
- Removed Thwomp's sound effect when it lands off-screen. (2018-02-01)
- Adjusted pole layering (it previously covered Mario). (2018-02-01)
- Updated black block texture. (2018-02-01)
- Updated Bullet Bill texture. (2018-02-04)
- Updated green block texture. (2018-02-04)
- Added All supported formats option to the level selection dialog. (2018-02-22)
- Updated textures for Red Koopa, Red Paratroopa, and red shells. (2018-02-24)
- Updated some pipe textures. (2018-02-24)
##### Bug Fixes
- Fixed an issue where kicked Buzzy Beetle shells always moved left. (2018-01-25)
- Fixed an issue where Mario couldn't bounce after stomping an enemy while invincible. (2018-02-01)
- Fixed an issue where spd. 1 platforms ignored solids when off-screen. (2018-02-02)
- Fixed the issue where item coordinates with negative coordinates became -999. (2018-02-02)
- Fixed missing animation when exiting from passages. (2018-02-02)
- Fixed crash when loading ultra-long levels; the encoding is now base-62, supporting lengths up to 61,999 pixels. (2018-02-02)
- Fixed an issue where red grass has no animation. (2018-02-04)
- Fixed white borders in Scenery Selector. (2018-02-04)
- Fixed layering issue where Fire Mario and Fire Bro.'s fireballs appeared above lava. (2018-02-04)
- Fixed Paratroopas getting stuck into solids. (2018-02-04)
- Fixed Fire Bro. getting stuck into solids. (2018-02-04)
- Fixed an issue where exiting to the editor after pressing `Esc` in the game would load an empty level. (2018-02-11)
- Fixed stuck-in-solid issues of Hammer Bro. and Fire Bro., improving upon Mario Worker 1.1 to eliminate the "stuck-then-break-free" motion. (2018-02-13)
- Fixed an issue where fireballs or beetroots could destroy moving Buzzy Beetle shells. (2018-02-25)
- Fixed an issue where water level didn't follow when panning levels with `F7`. (2018-02-27)
- Fixed an issue where Red Koopa could walk into solids when falling too close to them. (2018-02-27)
- Fixed hidden block collision issue with Buzzy Beetle. (2018-02-27)
##### Other
- Rewrote background rendering code. (2018-02-01)
- Consolidated all background music into the `Data` folder. (2018-02-01)

#### v1.3.1 (2017-10-14)
##### Bug Fixes
- Fixed an issue where some passages became disordered in level. (2017-09-03)

#### v1.3.0 (2017-08-16)
##### Editor
- Unlocked Fire Bro.,and the three rightmost columns in the Page 3 of Blocks Selector. (2017-08-15)
- Added more enemies to the editor. (2017-08-15)
- Added red-themed scenery and added reversed Bill Blasters. (2017-08-16)
- Revised the Blocks and Scenery Selector, adjusting the order of scenery items. (2017-08-16)
- Lava, lava base, and Bill Blaster Bases can now be placed continuously. (2017-08-16)
##### Bug Fixes
- Fixed incorrect graphics for reversed Bill Blasters in the editor. (2017-08-16)
- Corrected a typo in version check dialog. (2017-08-16)
- Fixed a rare issue where pipe auto-pair fonts would glitch out. (2017-08-16)

#### v1.2.7 (2017-08-05)
##### Editor
- The number of Check Points is now theoretically unlimited. In God Mode, jumping between Check Points follows their order in the level code. (2017-08-02)
- Adjusted Accurate Move behavior: when multiple objects overlap, only one can be moved, and accurate moving now requires selecting another object of the same type first. (2017-08-02)
- In the editor, scenery objects will no longer cover anything except blocks. (2017-08-05)
##### In Game
- Restored the default layer settings for certain objects. (2017-08-02)
- Minor layer adjustments. (2017-08-04)
- Underground background now has seamless tiling. (2017-08-05)
- The Check Point layer is now rendered behind other objects. (2017-08-05)
##### Bug Fixes
- Fixed an error occurring when saving Roto-Discs. (2017-07-30)
- Fixed the pop-up issues related to `F3`, `F4`, and Exit buttons, as well as a potential pop-up when using `F7` in the editor, through unconventional handling (destroying the pop-up-causing objects before event execution without affecting functionality). (2017-08-02)
- Fixed unresponsive numeric key `8` in God Mode. (2017-08-02)
- Fixed a glitch when loading levels. (2017-08-04)
- Fixed castle block textures. (2017-08-04)
- Fixed an issue where Thwomp would play its smile animation when striking the location of Mario's death. (2017-08-04)
- Fixed saving issues for Roto-Discs with negative parameters. (2017-08-04)
- Fixed music reset issue after Starman music ends. (2017-08-04)
- Fixed leftover Passage data in game. (2017-08-05)
- Fixed a bug where clicking Cancel in the file selector after pressing Load in the editor caused all objects to disappear. (2017-08-05)
- Fixed issue where background #10 appeared as background #1 in the editor. (2017-08-05)
##### Other
- Treated uninitialized variables as value 0. (2017-08-02)
- Redesigned the loading screen. (2017-08-04)

#### v1.2.2 (2017-07-28)
##### Editor
- Improved Roto-Disc parameter saving: now supports negative and decimal values. (2017-07-28)
- `WASD` keys can now be used instead of arrow keys for movement in the editor. (2017-07-28)
##### In Game
- Lakitus and Bill Blasters no longer produce sound effects when off-screen. (2017-07-01)
- Lakitu sound effects are now played in random order instead of fixed sequence. (2017-07-01)
- Bull's-Eye Blaster no longer fire when they are vertically off-screen. (2017-07-01)
##### Bug Fixes
- Fixed a pop-up error when loading a level in the editor before running any levels. (2017-07-01)
- Fixed an issue where auto-pairing toggler disappeared when within four tiles from the left edge of the screen (specifically on the object `o_edmain`). (2017-07-01)
- Fixed a bug in scenarios where bricks with IDs above 99 would automatically disappear. (2017-07-28)
- Fixed coordinate offset issues for certain scenery objects. (2017-07-28)
- Fixed coordinate offset issues for lava. (2017-07-28)

#### v1.2.0 (2017-06-28)
##### Editor
- Added new backgrounds including dusk, desert, darkness, volcano, and forest. (2017-06-17)
- Added level version check. (2017-06-17)
- Expanded the Blocks Selector. (2017-06-18)
- Improved the music selection screen and added several new tracks. (2017-06-18)
- Improved the background selection screen. (2017-06-18)
- Refined various textures. (2017-06-18)
- Added seperated bonuses to the bonus category. (2017-06-18)
- Optimized volcano and desert backgrounds. (2017-06-19)
- Added sealer solid. (2017-06-20)
- Optimized the Scenery, Marks, and Bonus Selector. (2017-06-23)
- Selected objects now show a placement preview. (2017-06-23)
- Updated the icon for sealer solids; they can now only be placed at the top of the level. (2017-06-23)
- Improved graphics for the Blocks Selector. (2017-06-24)
- Adjusted stored locations and display order for some music tracks. (2017-06-24)
- Added a new enemy: Lava base (028), and teased a new enemy: Fire Bro. (2017-06-25)
- Added auto-pairing for pipes and two-block castle bricks. (2017-06-25)
- After pressing `F7` to reset the level, saving no longer overwrites the current level. (2017-06-25)
- Updated and reformatted scenery assets. (2017-06-25)
- Added Bill Blaster Base object. (2017-06-25)
- The auto-pairing feature can now be toggled with `F12`. (2017-06-25)
- Fixed residual images appearing after auto-pair placement. (2017-06-27)
##### In Game
- Improved the animation of breaking bricks. (2017-06-19)
- Nerfed Stone Spiny: it can now be defeated by hitting bricks or by Starman Mario. (2017-06-20)
- Added animations to some sceneries. (2017-06-25)
- Separated Bonuses no longer disappear when off-screen. (2017-06-26)
- Experimentally optimized bonuses' behavior. (2017-06-26)
##### Bug Fixes
- Fixed residual layer issues. (2017-06-17)
- Fixed a crash caused by Bull's-Eye Blaster in scanarios. (2017-06-20)
- Fixed lava graphics. (2017-06-21)
- Fixed issues caused by sealer solids. (2017-06-21)
- Fixed an error when creating passages. (2017-06-23)
- Fixed an issue that caused the game to return to title screen after a Game Over when testing levels in the editor. (2017-06-23)
- Fixed several asset issues. (2017-06-24)
- Fixed a coordinate offset when Spiny Eggs transformed into Spinies upon landing. (2017-06-24)
- Fixed Hardcore 1-4 music not playing. (2017-06-24)
- Fixed a 1-pixel offset on the first page of the Blocks Selector. (2017-06-24)
- Fixed an issue that caused an error when saving levels with length/height that were multiples of 32 pixels. (2017-06-24)
- Fixed white dots appearing at the corners of light-brown bricks. (2017-06-25)
- Fixed background stretching issues. (2017-06-25)
- Fixed coordinate offsets in animated scenery. (2017-06-25)
- Fixed residual layer issues for Fire Flowers and Beetroots. (2017-06-26)
- Fixed background music becoming malfunctioned after invincibility ended. (2017-06-26)
- Fixed a crash when clicking outside the level area (on black regions). (2017-06-27)
- Fixed the issue where seperated mushrooms could not be collected. (2017-06-27)
- Fixed an issue where the player couldn't enter passages that overlapped with bricks. (2017-06-27)
- Fixed a pop-up error occurring after invincibility ended. (2017-06-27)
- Fixed scenery layer issues. (2017-06-27)
- Fixed an error when first opening certain levels containing Check Points. (2017-06-27)
- Fixed seperated 1-UP mushrooms still disappearing off-screen. (2017-06-28)
- Fixed an error when loading levels. (2017-06-28)

#### v1.1.0 (2017-06-15)
##### Editor
- In God Mode, use `PgUp` / `PgDn` to jump to the previous / next Check Point. (2016-09-05)
- In God Mode, press `9` to gain an extra life. (2016-09-05)
- Added a new set of Mario Forever-style backgrounds. (2016-09-05)
- Adjusted the layout of the background selection screen. (2016-09-05)
- The area below the actual level size now shows diagonal stripes. (2016-09-06)
- Updated the music selection screen and added 6 more selectable tracks. (2016-09-06)
- Passage entrances and exits now have matching pair numbers. (2016-09-07)
- Pressing `Esc` in the editor now returns to the previous screen. (2016-09-07)
- Added support for opening `.mfl` files for editing. (2017-01-21)
- Press `F3` / `F4` to test current level in editor; after pressing `Esc` to exit, editing can continue without saving in between. (2017-01-21)
- Level saving is now separated into Save and Save As. (2017-01-21)
- Overlapping Roto-Discs now show the number of overlaps at the lower-right corner of centerpoint and can together accurate move; if all overlapping Roto-Discs share the same angular velocity, it is displayed at the upper-left corner of centerpoint; otherwise, it is hidden. (2017-01-26)
- Added support for holding `Shift` on a Roto-Disc to view and edit its properties. (2017-01-26)
- Added support for off-screen enemies and off-screen solids. (2017-01-26)
- Restored compatibility with upward passage entrances from Mario Worker 4.4. (2017-01-26)
- Removed the purple background colors around various items. (2017-05-29)
- Added a new scenery: Large Purple Tree (ID: 107). (2017-05-29)
- Added a new enemy: Bull's-Eye Blaster (ID: 026). (2017-05-29)
##### In Game
- Bowser's HP is displayed numerically when it exceeds 20. (2016-09-06)
- When Bowser's HP exceeds 500, both HP value and bar are hidden. (2016-09-06)
- Pressing `Esc` during gameplay now asks for confirmation before exiting. (2016-09-07)
- Lava is now rendered beneath blocks. (2016-09-07)
- To prevent soft-locks when loading levels without a player starting position, one will now be automatically created, along with a warning message. (2017-01-21)
- Check Points now have activation animations. (2017-05-29)
##### Bug Fixes
- Fixed occasional background display issues when switching backgrounds in the editor. (2016-09-06)
- Fixed a crash when canceling level loading in the editor. (2016-09-06)
- Fixed graphical glitches in the underground and castle backgrounds for levels heights more than 480px. (2017-01-21)
- Fixed conditional logic in Camera Mode code. (2017-05-29)
- Fixed most layer issues. (2017-06-14)
##### Miscellaneous
- The splash screen can now also be skipped by mouse clicking. (2017-05-29)

#### v1.0.1 (Closed Beta) (2016-08-24)
##### Editor
- Scenery and passage entrances/exits are now rendered above the block layer. (2016-07-25)
- Middle mouse button can now be used for object selection. (2016-07-25)
- Passage entrances are now colored blue and exits red for easier identification. (2016-07-25)
- Added new object: Check Point. (2016-08-24)
- Added new enemy: Stone Spiny. (2016-08-24)
- Upward moving cloud platforms now function properly. (2016-08-24)
##### In Game
- Added animation for grass. (2016-07-09)
- Finished smiling animation for Thwomp. (2016-07-09)
- Moved certain enemies (Lakitu, Bullet Bill, Spiny Cheep Cheeps, Red Cheep Cheeps, Podoboos, Lava, Fireballs, Spiny Eggs, Hammer) to render above the block layer. (2016-07-25)
##### Bug Fixes
- Fixed issue where enemy code contained extra digits. (2016-07-09)
- Fixed score display layer issue. (2016-07-25)
- Fixed identical graphics for passage entrances and exits in the editor. (2016-07-25)

#### v0.2.4 (2016-07-07)
##### Editor
- Passage entrances and exits are now rendered on the topmost layer. (2016-07-02)
- Added accurate move for object placement. (2016-07-07)
##### In Game
- Mushrooms are now rendered above scenery layers. (2016-07-02)
- Bowser's HP bar is now drawn on the topmost layer. (2016-07-02)
- Restored original sky background and blue brick graphics. (2016-07-02)
- Adjusted the plus and minus symbols in the in-game font. (2016-07-07)
- Expanded Bowser's HP bar to 20 segments. (2016-07-07)
##### Other
- Changed window title to `Super Mario Worker Project`. (2016-07-07)

#### v0.2.2 (2016-07-02)
##### Editor
- Added feature: press `F6` in the editor to toggle background visibility. (2016-07-02)
- Added feature: press `F8` in the editor to play music for the current level. (2016-07-02)
- God Mode now includes a "Camera" mode. (2016-07-02)
##### In Game
- Replaced blue bricks with Mario Forever versions; sky background is now like that in 6-1 in Mario Forever. (2016-07-02)

#### v0.2.0 (2016-06-27)
##### Editor
- Added feature: hold `Shift` while pressing the up/down keys to adjust the water height. (2015-07-18)
- Added feature: in the editor, while the roto-disc is rotating in preview mode, use the mouse wheel to set its rotation speed. Hold `Shift` to open a dialog box for manually setting the radius and angle. (2015-07-18)
- When the level name length exceeds `32` characters, only the first 32 characters are shown in the `Pref's` window (all characters are still preserved). (2015-07-18)
- Each roto-disc now displays its rotation speed at the centerpoint. (2015-07-26)
- When the roto-disc preview dialog is opened with `Shift`, the speed must also be specified in addition to radius and angle. (2015-07-26)
- Updated the Piranha Plant sprite in the editor. (2015-12-31)
- Removed the `helpus` label from the lower-right corner of the editor. (2016-02-22)
- Added new feature: God Mode. Press `F4` in the editor and select a level to test it in God Mode. (2016-06-27)
##### In Game
- Removed certain coordinate offset corrections for enemies, starting positions, and goals. (2015-07-18)
- Restored Red Koopa speed to its original value. (2015-12-31)
- Death sound effect now matches that of *Mario Forever*. (2015-12-31)
- Goal rods are now double-sided. (2016-02-22)
- Brown bricks are now all square-cornered (no longer mixed with rounded ones). (2016-02-22)
- Brick-breaking animation now looks more natural. (2016-06-21)
##### Bug Fixes
- Fixed incorrect display in the music selection screen. (2015-07-23)
- Fixed issue where brick-defeated Spiny Eggs turned into shells. (2015-07-26)
- Fixed Bowser autoscrolling error. (2016-06-21)
- Fixed conflict when touching the goal while time was `0`. (2016-06-21)
- Fixed invincibility glitch when entering a passage at time `0`. (2016-06-21)
- Fixed the issue where the upright Red and inverted Green Piranha Plants had their sprites swapped between the editor and the game. (2016-06-21)
- Fixed graphic issue with coin bricks. (2016-06-22)
- Fixed the image issue with Thwomp smiling. (2016-06-22)
- Fixed issue where touching the goal after death still triggered level clear. (2016-06-27)
##### Other
- Added error log autosaving when the game occurs errors. (2015-12-30)
- Removed the original Mario Worker loading screen and replaced it with the `INNOVATION LEAP` logo. (2016-06-27)

#### v0.1.0 (Closed Beta) (2015-07-18)
##### Editor
- Removed level count and life limits when creating a scenario. (2015-07-16)
- Removed restrictions on level name length, gravity range, and Bowser energy. (2015-07-16)
- Default level name changed to `Mario Worker`. (2015-07-18)
- Default author name set to blank. (2015-07-18)
- Default time limit set to `600`. (2015-07-18)
- Default water level height set to `800px`. (2015-07-18)
- Default level size set to `20×15`. (2015-07-18)
- Disabled `S` and `D` keys in the editor. (2015-07-18)
- Added confirmation prompt when pressing `F3`, `F7`, loading, or exiting the editor to prevent accidental data loss. (2015-07-18)
##### In Game
- Added auto-pause when the game window loses focus. (2015-07-16)
- Press `Esc` in a playing level to exit. (2015-07-16)
- Slightly adjusted Hammer Bro. moving frequency. (2015-07-16)
- Increased Red Koopa speed. (2015-07-16)
- Fixed initial position offsets for Goombas, Green Koopas, Red Koopas, Parakoopas, and all four fish types. (2015-07-16)
- Podoboos now start one block lower. (2015-07-17)
- Increased passage entry and exit speed. (2015-07-17)
- Fine-tuned underwater death-by-sinking detection. (2015-07-17)
- Corrected initial positions of Podoboos, lava, and player starting position. (2015-07-17)
- Added sound effect to Lakitu. (2015-07-17)
- Changed Thwomp sound effect. (2015-07-17)
- Red and Green Cheep Cheeps can now be defeated by Koopa shells. (2015-07-17)
##### Bug Fixes
- Fixed disappearing Bullet Bills. (2015-07-16)
- Fixed Spiky Cheep Cheeps behavior. (2015-07-16)
- Fixed Spinies getting stuck into solids. (2015-07-16)
- Fixed reversed output direction for leftward passages. (2015-07-17)
- Fixed Super Mario sliding into passages and clipping through walls. (2015-07-17)
- Fixed difficulty entering upward passages. (2015-07-17)
- Fixed goal offset one tile to the right. (2015-07-17)
- Fixed swimming sprite alignment for Beetroot Mario underwater. (2015-07-17)
- Fixed hitbox issue after taking damage underwater as Super Mario. (2015-07-17)
- Fixed errors when Koopa shells hit Podoboos, Red or Green Cheep Cheeps. (2015-07-17)
- Fixed Spiny Eggs corpse turning into a shell. (2015-07-17)
- Fixed extra lives when shells hit Blue or Spiky Cheep Cheeps. (2015-07-17)
- Fixed infinite 1UP score cycling bug caused by hitting invincible enemies during Starman state. (2015-07-17)
- Fixed afterimage effect remaining after death during Starman state. (2015-07-17)
- Fixed occasional issue where upward moving platforms could not be stepped on. (2015-07-17)
- Fixed level name reverting to `Level1` when loading a saved level. (2015-07-18)
##### Other
- Changed homepage link on loading screen to `www.baidu.com`. (2015-07-18)
- Replaced loading screen music with `ktkm35`. (2015-07-18)