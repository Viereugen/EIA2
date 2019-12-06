package pedal2keyboard;

import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;

import javax.sound.sampled.*;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;

/***
 * Author: Dois Koh
 * Date: 27th October 2015
 * 
 * Gets your microphone signal and you can go do whatever you want with it.
 * Right now, it takes signals from my Cherub WTB-004 Keyboard Sustain Pedal, plugged into
 * my microphone jack, and converts it into key presses (holds down V when depressed,
 * releases V when released)
 */
public class PedalToKeyboard {

    // Robot for performing keyboard actions (pressing V)
    public static Robot robot = null;

    // Currently 8KHz, 16 bit signal (2 bytes), single channel, signed (+ and -) and BIG ENDIAN format
    public static AudioFormat format = new AudioFormat(8000.0f, 16, 1, true, true);

    public static TargetDataLine microphone = null;
    public static boolean pedalPressed = false;

    public static void main(String[] args) {

        try {
            // Initialize robot for later use
            robot = new Robot();

            // Retrieve the line to from which to read in the audio signal
            microphone = AudioSystem.getTargetDataLine(format);

            // Open the line in the specified format -
            // Currently 8KHz, 16 bit signal (2 bytes), single channel, signed (+ and -) and BIG ENDIAN format      
            microphone.open(new AudioFormat(8000.0f, 16, 1, true, true));

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] data = new byte[microphone.getBufferSize()/8];

            // Begin audio capture.
            microphone.start();

            int numBytesRead = 0;
            short previousShort = 0;

            // Continue until program is manually terminated
            while (true) {

                // Read the next chunk of data from the TargetDataLine.
                numBytesRead = microphone.read(data, 0, data.length);

                // Reset the buffer (get rid of previous data)
                out.reset();

                // Save this chunk of data.
                out.write(data, 0, numBytesRead);

                byte[] bytes = out.toByteArray();
                short[] shorts = new short[bytes.length/2];

                // to turn bytes to shorts as either big endian or little endian. 
                ByteBuffer.wrap(bytes).order(ByteOrder.BIG_ENDIAN).asShortBuffer().get(shorts);

                // Iterate through retrieved 16 bit data (shorts)
                for (short s : shorts) {

                    // Check if descending or ascending (pedal press is descending, release is ascending)
                    if (s < 0) { // descending                  
                        // make sure drop is large instantaneous drop
                        if (Math.abs(previousShort - s) > 200 && s < -32700) {
                            if (!pedalPressed) {
                                PedalPressedAction();
                                previousShort = s;
                                break;
                            }
                        }
                    } else if (s > 0) { // ascending
                        // make sure increase is large instantaneous increase
                        if (Math.abs(previousShort - s) > 200 && s > 32700) {
                            if (pedalPressed) {
                                PedalReleasedAction();
                                previousShort = s;
                                break;
                            }
                        }
                    }

                    previousShort = s;
                }
            }    

        } catch (LineUnavailableException | AWTException e) {
            e.printStackTrace();
        } finally {
            if (microphone != null)
                microphone.close();
        }
    }

    /***
     * The action to perform when the pedal is depressed
     */
    public static void PedalPressedAction() {
        pedalPressed = true;
        robot.keyPress(KeyEvent.VK_V);
    }

    /***
     * The action to perform when the pedal is released
     */
    public static void PedalReleasedAction(){
        pedalPressed = false;
        robot.keyRelease(KeyEvent.VK_V);        
    }
}